import React from 'react';
import { useForm } from 'react-hook-form';
import { useBlog } from '../context/blogContext';
export const Dashboard = () => {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const {createBlog} = useBlog()
  const onSubmit = async (data) => {
    try {
      await createBlog(data)
      console.log(data)
    } catch (error) {
      console.error("Error submitting the form:", error);
    }
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label htmlFor="title">Title</label>
        <input type="text" id="title" {...register('title', { required: 'Title is required' })} />
        {errors.title && <p>{errors.title.message}</p>}
      </div>
      <div>
        <label htmlFor="slug">Slug</label>
        <input type="text" id="slug" {...register('slug', { required: 'Slug is required' })} />
        {errors.slug && <p>{errors.slug.message}</p>}
      </div>
      <div>
        <label htmlFor="content">Content</label>
        <textarea id="content" {...register('content', { required: 'Content is required' })} />
        {errors.content && <p>{errors.content.message}</p>}
      </div>
      <div>
        <label htmlFor="image">Image URL</label>
        <input type="text" id="image" {...register('image')} />
      </div>
      <div>
        <label htmlFor="category">Category</label>
        <input type="text" id="category" {...register('category')} />
      </div>
      <div>
        <label htmlFor="tags">Tags (comma separated)</label>
        <input type="text" id="tags" {...register('tags')} />
      </div>
      <div>
        <label htmlFor="status">Status</label>
        <select id="status" {...register('status', { required: 'Status is required' })}>
          <option value="draft">Draft</option>
          <option value="published">Published</option>
        </select>
        {errors.status && <p>{errors.status.message}</p>}
      </div>
      <div>
        <label htmlFor="userId">User ID</label>
        <input type="text" id="userId" {...register('userId', { required: 'User ID is required' })} />
        {errors.userId && <p>{errors.userId.message}</p>}
      </div>
      <button type="submit">Create Post</button>
    </form>
  );
};
