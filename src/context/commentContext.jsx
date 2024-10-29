
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

  const handleLikeComment = async (id) => {
    setLoading(true); // Start loading
  
    try {
      const res = await likeComment(id); // Call the API function to like the comment
      if (res && res.data) {
        // Handle successful response, e.g., update UI with the new like count
        console.log('Comment liked successfully:', res.data);
        setReload(!reload)
        // You can also update the state or call a function to refresh comments
      }
    } catch (error) {
      console.log(`Error liking comment: ${error}`); // Log the error
    } finally {
      setLoading(false); // Stop loading
    }
  };
  
const getLikes = async (id) => {
  setLoading(true); // Inicia la carga
  
  try {
    const res = await getLikesComment(id); // Supongamos que `likeComment` obtiene los datos de likes
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
    setLoading(false); // Termina la carga
  }
};


  return (
    <CommentContext.Provider value={{reload, getLikes , loading, deleteCommentById,editCommentById,createComment,getCommentById,getComments,comments,setComments,handleLikeComment }}>
      {children}
    </CommentContext.Provider>
  );
};


 

