import instancia, { API } from "./Axios";

export const getBlogsRequest = () => instancia.get(`${API}/blogs`)
export const getBlogRequest = (id) => instancia.get(`${API}/gblogs/${id}`)
export const createBlogsRequest = (task) => instancia.post(`${API}/blogs`, task)
export const deleteBlogRequest = (id) => instancia.delete(`${API}/blog/${id}`)
export const updateBlogRequest = (id, blog) => instancia.patch(`${API}/blogs/${id}`, blog)
