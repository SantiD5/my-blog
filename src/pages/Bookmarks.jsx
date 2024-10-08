import React from 'react';

export const Bookmarks = () => {
  return (
    <body className='bg-gray-800'>
      <div className="max-w-4xl mx-auto p-6 bg-gray-800 rounded-lg shadow-md h-80">
      <h1 className="text-2xl font-semibold text-white mb-6">Bookmarks</h1>

      <ul className="space-y-4">
        <li className="border border-gray-700 p-4 rounded-md shadow-sm hover:bg-gray-700 transition">
          <h2 className="text-lg font-semibold text-white">Bookmark Title</h2>
          <p className="text-gray-300 text-sm mt-1">Bookmark Description</p>
          <div className="mt-4 flex justify-between items-center">
            <a
              href="#"
              className="text-indigo-400 hover:underline"
            >
              Read more
            </a>
            <button
              className="text-red-400 hover:underline"
            >
              Remove bookmark
            </button>
          </div>
        </li>
        {/* Repeat the above <li> block for additional bookmarks */}
      </ul>
    </div>
    </body>
    
  );
};
