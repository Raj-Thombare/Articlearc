import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { isAuth } from "../middleware/is-auth";
import { generateSignature, slugify } from "../utils";
import { encodeBase64 } from "hono/utils/encode";

interface CloudinaryUploadResponse {
    secure_url: string;
}

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
        CLOUDINARY_CLOUD_NAME: string;
        CLOUDINARY_API_SECRET: string;
        CLOUDINARY_API_KEY: string;
        CLOUDINARY_UPLOAD_PRESET: string;
    },
    Variables: {
        userId: string
    }
}>();

// Create post
postRouter.post('/', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.get('userId');

    try {
        const form = await c.req.formData();

        const title = form.get('title');
        const content = form.get('content');
        const tags = form.get('tags');
        const coverImage = form.get('coverImage') as File | null;

        if (!title || !content) {
            return c.json({ message: 'Title and content are required.' }, 400);
        }

        const parsedTags = tags ? JSON.parse(tags as string) : [];

        let coverImageUrl = null;
        if (coverImage) {
            const byteArrayBuffer = await coverImage.arrayBuffer();
            const base64 = encodeBase64(byteArrayBuffer);
            const mimeType = coverImage.type;

            const base64WithMime = `data:${mimeType};base64,${base64}`;

            const response = await fetch(`https://api.cloudinary.com/v1_1/${c.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                body: new URLSearchParams({
                    file: base64WithMime,
                    upload_preset: c.env.CLOUDINARY_UPLOAD_PRESET,
                }),
            });

            if (!response.ok) {
                const errorResponse = await response.json();
                throw new Error(`Error uploading image to Cloudinary: ${errorResponse}`);
            }

            const uploadResponse = await response.json() as CloudinaryUploadResponse;
            coverImageUrl = uploadResponse.secure_url;
        }

        const post = await prisma.post.create({
            data: {
                title: title as string,
                content: content as string,
                authorId: userId,
                coverImage: coverImageUrl,
                tags: {
                    connectOrCreate: parsedTags.map((tag: string) => ({
                        where: { name: slugify(tag) },
                        create: { name: slugify(tag) },
                    })),
                },
            },
        });

        return c.json({ id: post.id }, 201);
    } catch (error) {
        console.error('Error creating post:', error);
        return c.json({ error: 'Error while creating post' }, 500);
    }
});

// Update post
postRouter.patch('/:id', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param('id');
    try {
        const form = await c.req.formData();
        const title = form.get('title');
        const content = form.get('content');
        const tags = form.get('tags');
        const coverImage = form.get('coverImage');

        if (!title && !content && !tags && !coverImage) {
            return c.json({ message: 'At least one field must be provided to update.' }, 400);
        }

        const existingPost = await prisma.post.findUnique({
            where: { id: postId },
            include: { tags: true }
        });

        if (!existingPost) {
            return c.json({ error: "Post not found" }, 404);
        }
        const updatedData: any = {};

        if (title) {
            updatedData.title = title as string;
        }
        if (content) {
            updatedData.content = content as string;
        }
        if (coverImage) {
            if (typeof coverImage === 'object') {
                const byteArrayBuffer = await coverImage.arrayBuffer();
                const base64 = encodeBase64(byteArrayBuffer);
                const mimeType = coverImage.type;
                const base64WithMime = `data:${mimeType};base64,${base64}`;

                const response = await fetch(`https://api.cloudinary.com/v1_1/${c.env.CLOUDINARY_CLOUD_NAME}/image/upload`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                    body: new URLSearchParams({
                        file: base64WithMime,
                        upload_preset: c.env.CLOUDINARY_UPLOAD_PRESET,
                    }),
                });

                if (!response.ok) {
                    const errorResponse = await response.json();
                    throw new Error(`Error uploading image to Cloudinary: ${errorResponse}`);
                }

                const uploadResponse = await response.json() as CloudinaryUploadResponse;
                updatedData.coverImage = uploadResponse.secure_url;

                // delete old image
                if (existingPost.coverImage) {
                    const imageNameWithExtension = existingPost?.coverImage?.split('/').pop();
                    const imageId = 'articlearc/cover/' + imageNameWithExtension?.split('.').shift();

                    const deleteResponse = await fetch(`https://api.cloudinary.com/v1_1/${c.env.CLOUDINARY_CLOUD_NAME}/image/destroy`, {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
                        body: new URLSearchParams({
                            public_id: imageId,
                            api_key: c.env.CLOUDINARY_API_KEY,
                            timestamp: String(Math.floor(Date.now() / 1000)),
                            signature: generateSignature(imageId, c.env.CLOUDINARY_API_SECRET)
                        }),
                    });

                    if (!deleteResponse.ok) {
                        const errorResponse = await deleteResponse.json();
                        throw new Error(`Error deleting image from Cloudinary: ${errorResponse}`);
                    }
                }

            } else if (typeof coverImage === 'string') {
                updatedData.coverImage = coverImage;
            }
        }

        let parsedTags: string[] = [];
        if (tags && typeof tags === 'string') {
            try {
                parsedTags = JSON.parse(tags);
            } catch (error) {
                console.error("Error parsing tags:", error);
                return c.json({ error: "Invalid tags format" }, 400);
            }
        }

        await prisma.post.update({
            where: { id: postId },
            data: {
                ...updatedData,
                tags: {
                    set: [],
                    connectOrCreate: parsedTags.map(tag => ({
                        where: { name: tag },
                        create: { name: tag },
                    })),
                },
            },
            include: { tags: true },
        });

        return c.json({ message: "Post updated successfully" });
    } catch (error) {
        console.error("Error updating post:", error);
        return c.json({ error: "Error while updating post" }, 500);
    }
});

// Delete post
postRouter.delete('/:id', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param('id');
    const userId = c.get('userId');

    try {
        const post = await prisma.post.findUnique({
            where: { id: postId },
        });

        if (post?.authorId !== userId) {
            c.status(403);
            return c.json({ error: "Forbidden: You can only delete your own posts" });
        }

        await prisma.post.delete({
            where: { id: postId },
        });

        const imageNameWithExtension = post.coverImage?.split('/').pop();
        const imageId = 'articlearc/cover/' + imageNameWithExtension?.split('.').shift();

        const deleteResponse = await fetch(`https://api.cloudinary.com/v1_1/${c.env.CLOUDINARY_CLOUD_NAME}/image/destroy`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
            body: new URLSearchParams({
                public_id: imageId,
                api_key: c.env.CLOUDINARY_API_KEY,
                timestamp: String(Math.floor(Date.now() / 1000)),
                signature: generateSignature(imageId, c.env.CLOUDINARY_API_SECRET)
            }),
        });

        if (!deleteResponse.ok) {
            const errorResponse = await deleteResponse.json();
            throw new Error(`Error deleting image from Cloudinary: ${errorResponse}`);
        }

        return c.json({ msg: "Post deleted successfully" }, 200);
    } catch (error) {
        c.status(500);
        console.log(error)
        return c.json({ error: "Error while deleting post" });
    }
});

// Get all posts
postRouter.get('/all', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const posts = await prisma.post.findMany({
            select: {
                content: true,
                title: true,
                id: true,
                createdAt: true,
                coverImage: true,
                tags: {
                    select: {
                        name: true
                    }
                },
                authorId: true,
                author: {
                    select: {
                        name: true,
                    }
                }
            },
            orderBy: {
                createdAt: "desc"
            }
        });

        if (!posts || posts.length === 0) {
            c.status(404);
            return c.json({ error: "Posts not found" });
        }

        return c.json({ posts });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while fetching posts" });
    }
});

//get user posts
postRouter.get('/user/:userId', isAuth, async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const userId = c.req.param('userId');

    try {
        const posts = await prisma.user.findUnique({
            where: { id: userId },
            select: {
                posts: {
                    select: {
                        id: true,
                        title: true,
                        content: true,
                        createdAt: true,
                        coverImage: true,
                        tags: {
                            select: {
                                name: true
                            }
                        },
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true
                            }
                        }
                    },
                    orderBy: {
                        createdAt: 'desc'
                    }
                },
            }
        });

        if (!posts) {
            c.status(404);
            return c.json({ error: "User posts not found" });
        }

        return c.json({ posts });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while fetching user posts" });
    }
})

// Get post details
postRouter.get('/:id', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const postId = c.req.param('id');

    try {
        const post = await prisma.post.findFirst({
            where: { id: postId },
            select: {
                id: true,
                title: true,
                content: true,
                createdAt: true,
                coverImage: true,
                tags: {
                    select: {
                        name: true
                    }
                },
                author: {
                    select: {
                        name: true,
                        email: true,
                        id: true,
                        username: true,
                    }
                }
            }
        });

        if (!post) {
            c.status(404);
            return c.json({ error: "Post not found" });
        }

        return c.json({ post });
    } catch (error) {
        c.status(500);
        return c.json({ error: "Error while fetching post" });
    }
});

// Get posts by tag
postRouter.get('/tag/:tag', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    const tagName = c.req.param('tag'); 

    try {
        const posts = await prisma.post.findMany({
            where: {
                tags: {
                    some: {
                        name: tagName
                    }
                }
            },
            include: {
                tags: {
                    select: {
                        name: true
                    }
                },
                author: {
                    select: {
                        name: true
                    }
                }
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        if (posts.length === 0) {
            c.status(200);
            return c.json({ error: "Posts not found" });
        }

        return c.json({ posts });
    } catch (error) {
        console.error("Error fetching posts:", error);
        c.status(500);
        return c.json({ error: "Error while fetching posts" });
    }
});

//get all tags
postRouter.get('/tags/all', async (c) => {
    const prisma = new PrismaClient({
        datasourceUrl: c.env.DATABASE_URL,
    }).$extends(withAccelerate());

    try {
        const tags = await prisma.tag.findMany({
            include: {
                _count: {
                    select: { posts: true },
                },
            },
            orderBy: {
                posts: {
                    _count: 'desc',
                },
            },
        });

        if (tags.length === 0) {
            c.status(404);
            return c.json({ error: "No tags found" });
        }

        return c.json({ tags });
    } catch (error) {
        console.error("Error fetching tags:", error);
        c.status(500);
        return c.json({ error: "Error while fetching tags" });
    }
});


