import React, { useEffect } from 'react';
import { useBlog } from '../context/blogContext';

export const Blogs = () => {
  const { getBlogs, blogs,setBlogs } = useBlog(); // Destructure blogs directly from context
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await getBlogs(); // Llama a la función para obtener blogs
        if (res && res.data) { // Verifica que la respuesta sea válida
          setBlogs(res.data); // Establece los blogs si hay datos nuevos
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      }
    };
    
    fetchBlogs();
  }, [getBlogs]);
  

  return (
    <>
      {blogs && blogs.length > 0 ? (
        blogs.map((blog) => (
          <>
          <p key={blog.id}>This is the title {blog.title}</p>
          <p key={blog.id}>this is the description{blog.description}</p>
          </>
          
        ))
      ) : (
        <p>No blogs available.</p>
      )}
    </>
  );
};
