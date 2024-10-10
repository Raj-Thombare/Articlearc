import { Hono } from "hono";
import { PrismaClient } from '@prisma/client/edge';
import { withAccelerate } from '@prisma/extension-accelerate';
import { isAuth } from "../middleware/is-auth";
import { createPostInput, updatePostInput } from "@raj-thombare/medium-common-types";
import { arrayBufferToBase64, slugify } from "../utils";

export const postRouter = new Hono<{
    Bindings: {
        DATABASE_URL: string;
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

        let coverImageData = null;
        if (coverImage) {
            const arrayBuffer = await coverImage.arrayBuffer();
            coverImageData = arrayBufferToBase64(arrayBuffer);
        }
        const post = await prisma.post.create({
            data: {
                title: title as string,
                content: content as string,
                authorId: userId,
                coverImage: coverImageData,
                tags: {
                    create: parsedTags.map((tag: string) => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: slugify(tag) },
                                create: { name: slugify(tag) },
                            },
                        },
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
        const coverImage = form.get('coverImage') as File | null;

        if (!title || !content) {
            return c.json({ message: 'Title and content are required.' }, 400);
        }

        const parsedTags = tags ? JSON.parse(tags as string) : [];

        const existingPost = await prisma.post.findUnique({
            where: { id: postId }
        });
        if (!existingPost) {
            return c.json({ error: "Post not found" }, 404);
        }

        let coverImageData = existingPost.coverImage;
        if (coverImage && coverImage instanceof File) {
            const arrayBuffer = await coverImage.arrayBuffer();
            coverImageData = arrayBufferToBase64(arrayBuffer);
        } else if (coverImage) {
            console.warn('Expected coverImage to be a File instance, but got:', coverImage);
        }

        const updatedPost = await prisma.post.update({
            where: { id: postId },
            data: {
                title: title as string,
                content: content as string,
                coverImage: coverImageData ? coverImageData : existingPost.coverImage,
                tags: {
                    create: parsedTags.map((tag: string) => ({
                        tag: {
                            connectOrCreate: {
                                where: { name: slugify(tag) },
                                create: { name: slugify(tag) },
                            },
                        },
                    })),
                },
            }
        });

        return c.json({
            id: updatedPost.id,
            post: updatedPost
        });

    } catch (error) {
        console.error("Error updating post:", error);
        c.status(500);
        return c.json({ error: "Error while updating post" });
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
                    include: {
                        tag: {
                            select: {
                                name: true
                            }
                        },
                    }
                },
                authorId: true,
                author: {
                    select: {
                        name: true,
                    }
                }
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

//get users post
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
                            include: {
                                tag: {
                                    select: {
                                        name: true
                                    }
                                },
                            }
                        },
                        author: {
                            select: {
                                id: true,
                                name: true,
                                username: true
                            }
                        }
                    }
                }
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
                    include: {
                        tag: {
                            select: {
                                name: true
                            }
                        },
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
                        tag: {
                            name: tagName,
                        }
                    }
                }
            },
            include: {
                tags: {
                    include: {
                        tag: true,
                    }
                }
            }
        });

        if (posts.length === 0) {
            c.status(404);
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
        const tags = await prisma.tag.findMany();

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


