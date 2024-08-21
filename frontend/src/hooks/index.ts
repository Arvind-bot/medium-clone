import axios from "axios";
import { useEffect, useState } from "react"
import { BACKEND_URL } from "../config";

export interface Blog {
  id: string,
  title: string,
  content: string,
  publishedDate: string,
  author: {
    id: string,
    name: string
  }
}

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    handleGetBlogs();
  },[]);
  
  const handleGetBlogs = async () => {
    try {
      const blogsRes = await axios.get(`${BACKEND_URL}/api/v1/blog/b/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const bs = blogsRes?.data?.blogPosts;
      setBlogs(bs || []);
      setLoading(false);
    } catch (error) {
      console.error('error', error);
      alert((error as any)?.response?.data?.message || "Sorry, something went wrong. Please try again later.");
    }
  }

  return {
    loading, blogs
  }
}

export const useBlog = (blogId: string) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog>();

  useEffect(() => {
    handleGetBlog();
  },[blogId]);
  
  const handleGetBlog = async () => {
    try {
      const blogRes = await axios.get(`${BACKEND_URL}/api/v1/blog/${blogId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });
      const bp = blogRes?.data?.blogPost;
      setBlog(bp);
      setLoading(false);
      // const jwt = response?.data?.jwt;
    } catch (error) {
      console.error('error', error);
      alert((error as any)?.response?.data?.message || "Sorry, something went wrong. Please try again later.");
    }
  }

  return {
    loading, blog
  }
}
