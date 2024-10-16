
import React, { createContext, useContext, useState } from "react";
import { createCommentRequest, deleteCommentRequest, getCommentRequest, getCommentsRequest, updateCommentRequest } from "../Api/comment";

const CommentContext = createContext();

export const useComment = () => {
  const context = useContext(CommentContext);
  if (!context) {
    throw new Error("useComment must be used within a CommentProvider");
  }
  return context;
};

export const CommentProvider = ({ children }) => {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(false);

  const getComments = async (postId) => {
    setLoading(true);
    setComments([]); // Clear comments or show a specific message

    try {
        const response = await getCommentsRequest(postId);

        if (response.status === 404) {
            // Handle not found scenario
            setComments([]); // Clear comments or show a specific message
            console.error("Post not found.");
        } else {
            setComments(response.data);
        }
    } catch (error) {
        console.error("Error fetching the comments:", error);
    } finally {
        setLoading(false);
    }
};


  const getCommentById = async (id) => {
    setLoading(true);

    try {
      const response = await getCommentRequest(id);
      setComments(response.data);
      return response.data
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }finally{
      setLoading(false)
    }
  };

  const createComment= async (comment) => {
    setLoading(true);
    try {
      const res = await createCommentRequest(comment);
      setComments((prevComments) => [...prevComments, res.data]);
      console.log(res);
    } catch (error) {
      console.error("Error creating comment:", error);
    } finally {
      setLoading(false);
    }
  };
  const editCommentById = async (id,comment) => {
    setLoading(true);
    try {
      const res = await updateCommentRequest(id, comment);
      setComments((prevComments) =>
        prevComments.map((c) => (c.id === id ? res.data : c))
      );
      console.log(res);
    } catch (error) {
      console.log(`Error updating comment: ${error}`);
    } finally {
      setLoading(false);
    }
  }
  const deleteCommentById = async (id) => {
    setLoading(true);
    try {
      await deleteCommentRequest(id);
      setComments((prevComments) => prevComments.filter((c) => c.id !== id));
    } catch (error) {
      console.log(`Error deleting comment: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <CommentContext.Provider value={{ loading, deleteCommentById,editCommentById,createComment,getCommentById,getComments,comments,setComments }}>
      {children}
    </CommentContext.Provider>
  );
};


 

