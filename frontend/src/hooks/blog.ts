import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND } from "../config";
import { Blog } from '../lib/types';

export const fetchBlogData = async (endpoint: string) => {
    const token = localStorage.getItem('token');

    try {
        const { data } = await axios.get(`${BACKEND}/api/v1/post/${endpoint}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        return data;
    } catch (error) {
        console.error("Failed to fetch data:", error);
        throw error;
    }
};

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        const data = await fetchBlogData('all');
        const sortedBlogs = data.posts.sort((a: Blog, b: Blog) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        );
        setBlogs(sortedBlogs);
        setLoading(false);
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return { loading, blogs }
}

export const useBlog = ({ id }: { id: string }) => {
    const [blog, setBlog] = useState<Blog>();
    const [loading, setLoading] = useState(true);

    const fetchBlog = async () => {
        const data = await fetchBlogData(id);
        setBlog(data.post)
        setLoading(false)
    }

    useEffect(() => {
        fetchBlog();
    }, [])

    return { loading, blog }
}

