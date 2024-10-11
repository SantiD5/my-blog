import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Reader } from '../components/Reader/Reader';
import { useBlog } from '../context/blogContext';

export const Blog = () => {
  const { getBlogById } = useBlog();
  const { id } = useParams();
  const [blogPost, setBlogPost] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [content, setContent] = useState('<p>Loading...</p>'); // Default content

  // Fetch blog post when the component mounts
  useEffect(() => {
    const getBlog = async () => {
      setLoading(true);
      try {
        const res = await getBlogById(id); // Call the context function with the ID
        setBlogPost(res); // Assuming res contains the blog post data
        setComments(res.comments || []); // Assuming the blog has a comments array
      } catch (e) {
        setError('Error fetching the blog post.');
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
      const newComments = [...comments, { text: newComment, author: 'Anonymous' }];
      setComments(newComments);
      setNewComment('');
      // Optionally, make an API call to save the comment in your database
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
    <body className='bg-gray-800'>
       <div className="bg-gray-800 container mx-auto px-4 py-8 w-full max-w-5xl">

{/* Render the editor with the updated content */}
      {/* Blog post content */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden mb-8">
        {/* Blog Title */}

        <h1 className="text-4xl font-semibold text-gray-900 p-6 border-b border-gray-200">
          {loading ? 'Loading...' : blogPost ? blogPost.title : 'Blog Not Found'}
        </h1>

        {/* Blog Meta Info */}
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <p className="text-gray-600">
            <span className="font-semibold">Category:</span> {loading ? 'Loading...' : blogPost ? blogPost.category : 'N/A'}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Published on:</span> {loading ? 'Loading...' : blogPost ? new Date(blogPost.createdAt).toLocaleDateString() : 'N/A'}
          </p>
        </div>

        {/* Blog Content */}
        <div className="p-6">
          {loading ? (
            <p className="text-gray-500">Loading content...</p>
          ) : (
            blogPost ? (
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
                <p className="text-gray-600 mb-4">
                  <span className="font-semibold">Slug:</span> {blogPost.slug}
                </p>
              </div>
            ) : (
              <p className="text-gray-500">No blog content available.</p>
            )
          )}
        </div>
      </div>

      {/* Comments Section */}
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="p-6 border-t border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comments</h2>
          <div className="space-y-4">
            {comments.length ? (
              comments.map((comment, index) => (
                <div key={index} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                  <p className="text-gray-700">{comment.text}</p>
                  <span className="text-sm text-gray-500">- {comment.author}</span>
                </div>
              ))
            ) : (
              <p className="text-gray-500">No comments yet.</p>
            )}
          </div>

          {/* Add Comment Form */}
          <div className="mt-6 flex flex-col">
            <textarea
              className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
              placeholder="Add a comment..."
              rows="4"
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <button
              onClick={handleCommentSubmit}
              className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
            >
              Submit Comment
            </button>
          </div>
        </div>
      </div>

      {/* Error Handling */}
      {error && <div className="bg-red-100 text-red-700 p-4 text-center mt-8">{error}</div>}
    </div>

    </body>
   
  );
};
