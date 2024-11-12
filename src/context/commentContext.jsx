
import React, { createContext, useContext, useState } from "react";
import { createCommentRequest, deleteCommentRequest, getCommentRequest, getCommentsRequest, likeComment, updateCommentRequest } from "../Api/comment";

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
  const [reload, setReload] = useState(false);

  const getComments = async (postId) => {
    setLoading(true);
    setComments([]);

    try {
        const response = await getCommentsRequest(postId);

        if (response.status === 404) {
            setComments([]); 
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
      console.log(comment)
      const res = await updateCommentRequest(id, comment);
      console.log(res)
      setComments((prevComments) =>
        prevComments.map((c) => (c.id === id ? res.data : c))
      );
      console.log(comments);
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
      setComments((prevComments) => prevComments.filter((c) => c._id !== id));
    } catch (error) {
      console.log(`Error deleting comment: ${error}`);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeComment = async (id) => {
    setLoading(true); // Start loading
    try {
      const res = await likeComment(id);
      if (res && res.data) {
        console.log('Comment liked successfully:', res.data);
        setReload(!reload)
      }
    } catch (error) {
      console.log(`Error liking comment: ${error}`);
    } finally {
      setLoading(false); 
    }
  };
  
const getLikes = async (id) => {
  setLoading(true); 
  
  try {
    const res = await getLikesComment(id); 
    if (res && res.data) {
      setComments((prevComments) =>
        prevComments.map((comment) =>
          comment.id === id ? { ...comment, likes: res.data.likes } : comment
        )
      );
      console.log('Fetched likes successfully:', res.data);
    }
  } catch (error) {
    console.log(`Error fetching likes for comment ${id}: ${error}`);
  } finally {
    setLoading(false); 
  }
};


  return (
    <CommentContext.Provider value={{reload, getLikes , loading, deleteCommentById,editCommentById,createComment,getCommentById,getComments,comments,setComments,handleLikeComment }}>
      {children}
    </CommentContext.Provider>
  );
};


 

