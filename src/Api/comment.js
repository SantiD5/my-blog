import instancia, { API } from "./Axios";

export const getCommentsRequest = (postId) => instancia.get(`${API}/comments?postId=${postId}`);
export const getCommentRequest = (id) => instancia.get(`${API}/comment/${id}`)
export const createCommentRequest = (comment) => instancia.post(`${API}/comment`, comment)
export const deleteCommentRequest = (id) => instancia.delete(`${API}/comment/${id}`)
export const updateCommentRequest = (id, comment) => instancia.patch(`${API}/comment/${id}`, comment)


