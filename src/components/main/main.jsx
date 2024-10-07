import React, { useEffect } from 'react';
import { useBlog } from '../../context/blogContext';
import { Card } from "../Card/Card";
import "./main.css";


export const Main = () => {
  const { getBlogs, blogs,setBlogs } = useBlog();
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
  const formatDate = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };
  return (
    <div className="main">
      {blogs && blogs.length > 0 ? (
        blogs
          .filter(blog => !blog.draft) // Filter out drafts
          .map(blog => (
            <Card 
            title={blog.title}
              key={blog.userId} 
              img={blog.img} 
              minutes={blog.minutes} 
              date={formatDate(blog.date)} 
              category={blog.category}
              id={blog._id}
            >
              {blog.id}
            </Card>
          ))
      ) : (
        <p>No blogs available.</p>
      )}
    </div>
  );
};
