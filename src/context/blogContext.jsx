
import React, { createContext, useCallback, useContext, useState } from "react";
import { createBlogsRequest, deleteBlogRequest, getBlogRequest, getBlogsRequest, updateBlogRequest } from "../Api/Blog";

const BlogContext = createContext();

export const useBlog = () => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};

export const BlogProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);

  const getBlogs = useCallback(async () => {
    try {
      const response = await getBlogsRequest();
      setBlogs(response.data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  }, []);
  const getBlogById = async (id) => {
    try {
      const response = await getBlogRequest(id);
      setBlogs(response.data);
      return response.data
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const createBlog = async (blog) => {
    const res = await createBlogsRequest(blog);
    console.log(res);
  };
  const editBlogById = async (id) => {
    try {
      const response = await updateBlogRequest(id);
    } catch (e) {
      console.log(e)
    }
  }
  const deleteBlogById = async (id) => {
    try {
      const response = await deleteBlogRequest(id);
      setBlogs(response.data)
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <BlogContext.Provider value={{ editBlogById, createBlog, blogs, setBlogs, getBlogs, getBlogById, deleteBlogById }}>
      {children}
    </BlogContext.Provider>
  );
};
