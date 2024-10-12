import React, { useEffect, useState } from "react";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { Link, useParams } from "react-router-dom";
import { useBlog } from "../context/blogContext";

export const ViewPost = () => {
  const { id } = useParams(); // Get the post ID from the URL
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Initialize error as null
  const { getBlogs, blogs, setBlogs, deleteBlogById } = useBlog();

  const deleteBlog = async (id) => {
    try {
      const res = await deleteBlogById(id);
      if (res && res.data) {
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog._id !== id));
      }
    } catch (e) {
      console.log(e);
      setError(e); // Set error to the actual error object
    }
    setLoading(true)

  };

  useEffect(() => {
    // Fetch post data from API based on the post ID
    const getPosts = async () => {
      try {
        const res = await getBlogs();
        console.log(res);
        if (res && res.data) {
          setBlogs(res.data); // Update the state with the fetched blogs
        }
      } catch (e) {
        console.log(e);
        setError(e); // Set error to the caught error object
      } finally {
        setLoading(false); // Set loading to false after data is fetched
      }
    };

    getPosts();
  }, [getBlogs,blogs._id]); // Dependency array with getBlogs

 
  if (loading) {
    return (
      <div className="text-white text-center p-6">
        <p>Loading...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-white text-center p-6">
        <p>Error: {error.message || "Something went wrong!"}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-6 py-12 bg-gray-800 min-h-screen">
      {blogs.map((blog) => (
        <div key={blog._id} className="bg-gray-900 p-6 rounded-lg shadow-md mb-4">
          {/* Blog Title */}
          <h1 className="text-4xl font-extrabold text-white mb-4">{blog.title}</h1>

          {/* Blog Description */}
          <p className="text-white mb-4">{blog.description}</p>

          {/* Blog Author and Date */}
          <div className="flex items-center space-x-2 mb-6">
            <FaUserAlt className="text-pink-500" />
            <p className="text-gray-300">{blog.author}</p>
            <FaCalendarAlt className="text-pink-500" />
            <p className="text-gray-300">
              Published on {new Date(blog.publishedAt).toLocaleDateString()}
            </p>
          </div>

          {/* Edit and Delete Buttons */}
          <div className="flex space-x-4">
            {/* Edit Button */}
            <Link to={`/edit/${blog._id}`}>
              <button className="px-4 py-2 text-sm font-medium text-center text-white bg-green-600 rounded-lg hover:bg-green-700 focus:ring-4 focus:outline-none focus:ring-green-300 transition-colors duration-300">
                Edit
              </button>
            </Link>

            {/* Delete Button */}
            <button
              onClick={() => deleteBlog(blog._id)} // Correct function call
              className="px-4 py-2 text-sm font-medium text-center text-white bg-red-600 rounded-lg hover:bg-red-700 focus:ring-4 focus:outline-none focus:ring-red-300 transition-colors duration-300"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
      
      {/* Back to Blog Link */}
      <div className="mt-8">
        <Link
          to="/gblogs"
          className="text-pink-600 hover:text-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-colors duration-300"
        >
          ← Back to Blog
        </Link>
      </div>
    </div>
  );
};
