import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import { useBlog } from '../context/blogContext';

export const Dashboard = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const { createBlog } = useBlog();
  const [isBlog, setIsBlog] = useState(false);

  const onSubmit = async (data) => {
    try {
      await createBlog(data);
      console.log(data);
      console.log(data._id);

      setIsBlog(true);
    } catch (error) {
      return console.error("Error submitting the form:", error);
    }

    if (isBlog) {
      return <Navigate to={`/gblogs/$6705993147b227599d616fe1`} />;
    }
  };

  return (
    <body className='bg-gray-800'>
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-lg mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Title */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-700">Title</label>
        <input 
          type="text" 
          id="title" 
          {...register('title', { required: 'Title is required' })} 
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.title && <p className="text-red-600 text-sm">{errors.title.message}</p>}
      </div>

      {/* Slug */}
      <div className="mb-4">
        <label htmlFor="slug" className="block text-sm font-medium text-gray-700">Slug</label>
        <input 
          type="text" 
          id="slug" 
          {...register('slug', { required: 'Slug is required' })} 
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.slug && <p className="text-red-600 text-sm">{errors.slug.message}</p>}
      </div>

      {/* Content */}
      <div className="mb-4">
        <label htmlFor="content" className="block text-sm font-medium text-gray-700">Content</label>
        <textarea 
          id="content" 
          {...register('content', { required: 'Content is required' })} 
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.content && <p className="text-red-600 text-sm">{errors.content.message}</p>}
      </div>

      {/* Description */}
      <div className="mb-4">
        <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
        <input 
          type="text" 
          id="description" 
          {...register('description', { required: 'Description is required' })} 
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
        {errors.description && <p className="text-red-600 text-sm">{errors.description.message}</p>}
      </div>

      {/* Image URL */}
      <div className="mb-4">
        <label htmlFor="image" className="block text-sm font-medium text-gray-700">Image URL</label>
        <input 
          type="text" 
          id="image" 
          {...register('image')} 
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Category */}
      <div className="mb-4">
        <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
        <input 
          type="text" 
          id="category" 
          {...register('category')} 
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Tags */}
      <div className="mb-4">
        <label htmlFor="tags" className="block text-sm font-medium text-gray-700">Tags (comma separated)</label>
        <input 
          type="text" 
          id="tags" 
          {...register('tags')} 
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        />
      </div>

      {/* Status */}
      <div className="mb-4">
        <label htmlFor="status" className="block text-sm font-medium text-gray-700">Status</label>
        <select 
          id="status" 
          {...register('status', { required: 'Status is required' })} 
          className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        {errors.status && <p className="text-red-600 text-sm">{errors.status.message}</p>}
      </div>

      {/* Submit Button */}
      <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2">
        Create Post
      </button>
    </form>

    </body>
  );
};
