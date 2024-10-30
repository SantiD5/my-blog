import React, { useEffect, useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useParams } from 'react-router-dom';
import Tiptap from '../components/Editor/Editor';
import { useBlog } from '../context/blogContext';

export const EditPost = () => {
  const { register, handleSubmit, control, setValue, formState: { errors } } = useForm();
  const { getBlogById, editBlogById } = useBlog();
  const { id } = useParams();
  const [isBlogUpdated, setIsBlogUpdated] = useState(false);
  const [status, setStatus] = useState('draft');
    const [content, setContent] = useState('');

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const blog = await getBlogById(id);
        if (blog) {
          setValue('title', blog.title);
          setValue('slug', blog.slug);
          setValue('description', blog.description);
          setValue('category', blog.category);
          setValue('tags', blog.tags);
          setContent(JSON.parse(blog.content)); // Set content state
          setStatus(blog.isDraft ? 'draft' : 'published');
        }
      } catch (error) {
        console.error('Error fetching blog:', error);
      }
    };
    fetchBlog();
  }, [id, setValue]);

  const handleStatusChange = (e) => {
    setStatus(e.target.value);
  };

  const handleContentChange = (newContent) => {
    setContent(newContent);
    setValue('content', newContent); 
  };
  

  const onSubmit = async (data) => {
    try {
      const contentAsString = JSON.stringify(content);

      console.log(data); 
      const blogData = { ...data, content: contentAsString}; 

      console.log(`this is the blogdata ${JSON.stringify(blogData)}`); 
        const editBlog = await editBlogById(id, blogData); 
      console.log(editBlog)
      setIsBlogUpdated(true); 
    } catch (error) {
      console.error('Error updating the blog:', error);
    }
  };



  return (
    <body className="bg-gray-800">
      <form onSubmit={handleSubmit(onSubmit)} className="max-w-[60%] mx-auto bg-white p-6 rounded-lg shadow-md">
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
          <Controller
            name="content"
            control={control}
            rules={{ required: 'Content is required' }}
            render={() => (
              <Tiptap content={content}  onContentChange={handleContentChange} edit={true} />
            )}
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
            value={status}
            onChange={handleStatusChange}
            className="text-black mt-1 block w-full p-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          >
            <option value="draft">Draft</option>
            <option value="published">Published</option>
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 px-4 rounded-md hover:bg-indigo-700 focus:ring-indigo-500 focus:outline-none focus:ring-2 focus:ring-offset-2">
          Edit Post
        </button>
      </form>
    </body>
  );
};
