import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CommentSection } from "../components/Comments/commentSection.jsx";
import { Reader } from "../components/Reader/Reader";
import { useBlog } from "../context/blogContext";

export const Blog = () => {
  const { getBlogById } = useBlog();
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [content, setContent] = useState("<p>Loading...</p>"); // Default content

  // Fetch blog post when the component mounts
  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      try {
        const res = await getBlogById(id); // Call the context function with the ID
        setBlogPost(res);
        setComments(res.comments || []);
      } catch (e) {
        setError("Error fetching the blog post.");
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    getBlog();
  }, [id]);

  // Handle comment submission
  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      const newComments = [
        ...comments,
        { text: newComment, author: "Anonymous" },
      ];
      setComments(newComments);
      setNewComment("");
    }
  };

  useEffect(() => {
    const handleContentChange = (post) => {
      setContent(post.content); // Update the state with the new content
    };
    if (blogPost) {
      handleContentChange(blogPost);
    }
  }, [blogPost]);

  return (
    <body className="bg-gray-800">
      <div className="bg-gray-800 container mx-auto px-4 py-8 w-full max-w-5xl">
        {/* Render the editor with the updated content */}
        {/* Blog post content */}
        <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
          {/* Blog Title */}

          <h1 className="text-4xl font-semibold text-gray-900 p-6 border-b border-gray-200">
            {loading
              ? "Loading..."
              : blogPost
              ? blogPost.title
              : "Blog Not Found"}
          </h1>

          {/* Blog Meta Info */}
          <div className="p-6 border-b border-gray-200 flex items-center justify-between">
            <p className="text-gray-600">
              <span className="font-semibold">Category:</span>
              {loading
                ? "Loading..."
                : blogPost && blogPost.category
                ? blogPost.category
                : "N/A"}
            </p>
            <p className="text-gray-600">
              <span className="font-semibold">Published on:</span>{" "}
              {loading
                ? "Loading..."
                : blogPost
                ? new Date(blogPost.createdAt).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          {/* Blog Content */}
          <div className="p-6">
            {loading ? (
              <p className="text-gray-500">Loading content...</p>
            ) : blogPost ? (
              <div>
                {/* Blog Post Image */}
                {blogPost.image && (
                  <img
                    src={blogPost.image}
                    alt={blogPost.title}
                    className="w-full h-80 object-cover mb-6 rounded-lg shadow-md"
                  />
                )}

                {/* Blog Post Content */}
                <Reader content={content} />

                {/* Blog Slug */}
              </div>
            ) : (
              <p className="text-gray-500">No blog content available.</p>
            )}
          </div>
        </div>

        {/* Comments Section */}
        <CommentSection blog={id} />

        {/* Error Handling */}
        {error && (
          <div className="bg-red-100 text-red-700 p-4 text-center mt-8">
            {error}
          </div>
        )}
      </div>
    </body>
  );
};
