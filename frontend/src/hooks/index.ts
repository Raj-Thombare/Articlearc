import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND } from "../config";

export interface Blog {
    content: string;
    title: string;
    id: string
    author: {
        name: string
    }
    createdAt: string
}

export const useBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    const fetchBlogs = async () => {
        const res = await axios.get(`${BACKEND}/api/v1/post/bulk`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setBlogs(res.data.posts)
        setLoading(false)
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return { loading, blogs }
}

export const useBlog = ({ id }: { id: string }) => {
    const [blog, setBlog] = useState<Blog>({
        id: "",
        title: "",
        content: "",
        createdAt: "",
        author: {
            name: ""
        }
    });
    const [loading, setLoading] = useState(true);

    const token = localStorage.getItem('token');

    const fetchBlog = async () => {
        const res = await axios.get(`${BACKEND}/api/v1/post/${id}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        setBlog(res.data.post)
        setLoading(false)
    }

    useEffect(() => {
        fetchBlog();
    }, [])

    return { loading, blog }
}
