// import { blogListQuery, blogQuery } from './../store/state';
import { useRecoilState } from 'recoil';
import axios from "axios";
import { useState, useEffect } from "react";
import { BACKEND } from "../config";
import { blogListState, blogState } from "../store/state";
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
    const [blogs, setBlogs] = useRecoilState<Blog[]>(blogListState);
    const [loading, setLoading] = useState(true);

    const fetchBlogs = async () => {
        const data = await fetchBlogData('bulk');
        setBlogs(data.posts)
        setLoading(false)
    }

    useEffect(() => {
        fetchBlogs();
    }, [])

    return { loading, blogs }
}

export const useBlog = ({ id }: { id: string }) => {
    const [blog, setBlog] = useRecoilState<Blog>(blogState);
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

// export const useBlogs = () => {
//     const blogs = useRecoilValue(blogListQuery);
//     const setBlogs = useSetRecoilState(blogListState);

//     useEffect(() => {
//         setBlogs(blogs);
//     }, [blogs, setBlogs]);

//     return { blogs };
// };

// export const useBlog = (id: string) => {
//     const blog = useRecoilValue(blogQuery(id));
//     const setBlog = useSetRecoilState(blogState);

//     useEffect(() => {
//         setBlog(blog);
//     }, [blog, setBlog]);

//     return { blog };
// };

