import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useBlog } from '../context/blogContext';

export const Blog = () => {
  const { getBlogById , blogs} = useBlog();
  const { id } = useParams(); 
  const [blogPost, setBlogPost] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Fetch blog post when the component mounts
  useEffect(()=>{
    const getBlog = async () => {
      setLoading(true);
      try {
        const res = await getBlogById(id); // Call the context function with the ID
        console.log(res)
        setBlogPost(res); // Assuming res contains the blog post data
        console.log(blogPost)
      } catch (e) {
        setError('Error fetching the blog post.');
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getBlog()
  },[id])

  return (
    <div className="blog-post">
      <h2>{loading ? 'Loading...' : (blogPost ? blogPost.title : 'Blog Not Found')}</h2>
      {error && <p>{error}</p>}
      <p>{loading ? '...' : (blogPost ? blogPost.content : '')}</p>
      <small>{loading ? '' : (blogPost ? new Date(blogPost.timestamp).toLocaleDateString() : '')}</small>
    </div>
  );
};
