import { Link } from 'react-router-dom';

export const Card = ({ description, id, date, minutes, title }) => {
  const formattedDate = new Date(date).toLocaleDateString();

  return (
    <article className="max-w-3xl bg-gray-900 border border-gray-700 rounded-lg shadow-lg overflow-hidden transition-transform transform hover:scale-105 hover:shadow-xl dark:bg-gray-800 dark:border-gray-600 mb-8">
      
      {/* Content Section */}
      <div className="p-6">
        {/* Blog Title */}
        <Link to={`/gblogs/${id}`}>
          <h5 className="mb-2 text-3xl font-semibold text-white truncate hover:text-pink-500 transition-colors duration-300">
            {title}
          </h5>
        </Link>
        
        {/* Blog Description */}
        <p className="mb-4 text-gray-400 line-clamp-3">
          {description}
        </p>

        {/* Read More Button */}
        <Link
          to={`/gblogs/${id}`}
          className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-pink-600 rounded-lg hover:bg-pink-700 focus:ring-4 focus:outline-none focus:ring-pink-300 transition-colors duration-300"
        >
          Read more
          <svg
            className="rtl:rotate-180 w-4 h-4 ml-2"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 14 10"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 5h12m0 0L9 1m4 4L9 9"
            />
          </svg>
        </Link>

        {/* Blog Date and Time */}
        <p className="mt-4 text-sm text-gray-500 dark:text-gray-300">
          Published on {formattedDate} • {minutes} min read
        </p>
      </div>
    </article>
  );
};
