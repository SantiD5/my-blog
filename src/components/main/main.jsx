import { useEffect, useState } from 'react';
import { useBlog } from '../../context/blogContext';
import { Card } from '../Card/Card';

export const Main = () => {
  const { getBlogs, blogs, setBlogs } = useBlog();
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);  // Set loading to true before fetching
        const res = await getBlogs();
        if (res && res.data) {
          setBlogs(res.data);  // Update blogs if the fetch is successful
        }
      } catch (err) {
        console.error('Error fetching blogs:', err);
        setError('Error fetching blogs. Please try again later.');  // Set error message
      } finally {
        setLoading(false);  // Set loading to false after the fetch attempt
      }
    };

    fetchBlogs();
  }, [getBlogs, setBlogs]);

  return (
    <body className='bg-gray-800'>
      <div className="bg-gray-800 w-full lg:w-[80%] mx-auto"> {/* Full-width and 80% on lg */}
        {/* Main Layout */}
        <div className="flex flex-wrap lg:flex-nowrap gap-10 px-5 py-10">
          {/* Main Content Area */}
          <main className="flex-1 p-5 rounded-lg dark:text-white lg:w-2/3">
            <h1 className="text-3xl font-bold mb-8 text-gray-800 dark:text-white">Latest Blog Posts</h1>

            {/* Conditional Rendering: Loading or Error */}
            {loading ? (
              <p className="text-gray-500">Loading blogs...</p>
            ) : error ? (
              <p className="text-red-500">{error}</p>
            ) : blogs && blogs.length > 0 ? (
              blogs
                .filter(blog => !blog.draft) // Filtering out drafts
                .map(blog => (
                  <Card
                    key={blog._id}
                    title={blog.title}
                    description={blog.description}
                    img={blog.img}
                    minutes={blog.minutes}
                    date={blog.date}
                    category={blog.category}
                    id={blog._id}
                  />
                ))
            ) : (
              <p className="text-gray-500">No blogs available.</p>
            )}
          </main>

          {/* Sidebar */}
          <aside className="w-full lg:w-1/3 bg-gray-800 p-5 rounded-lg sticky top-0 h-[calc(100vh-2.5rem)]">
            {/* Browse by Category */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-white mb-4">Browse by Category</h2>
              <ul className="text-gray-400">
                <li className="mb-2"><a href="#" className="hover:text-blue-500">Technology</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-500">Programming</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-500">Design</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-500">Lifestyle</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-500">News</a></li>
              </ul>
            </div>

            {/* Popular Content */}
            <div>
              <h2 className="text-xl font-semibold text-white mb-4">Popular Content</h2>
              <ul className="text-gray-400">
                <li className="mb-2"><a href="#" className="hover:text-blue-500">5 Ways to Learn JavaScript</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-500">Best Design Tools for 2024</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-500">Top 10 Coding Challenges</a></li>
                <li className="mb-2"><a href="#" className="hover:text-blue-500">How to Build a Fullstack App</a></li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </body>
  );
};
