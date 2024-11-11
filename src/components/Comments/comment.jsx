import React, { useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAuth } from "../../context/authContext.jsx";
import { useComment } from "../../context/commentContext.jsx";
import ActionMenu from "./Forms/ActionMenu.jsx";
import EditCommentForm from "./Forms/EditComment.jsx";
import ReplyForm from "./Forms/ReplyForm.jsx";

export const Comment = ({ comment, isAuthenticated ,blog}) => {
  const {
    comments,
    loading,
    createComment,
    getComments,
    setComment,
    handleLikeComment,
    reload,
    deleteCommentById,
    editCommentById,
  } = useComment();
  const { user } = useAuth();
  const [isEdit, setIsEdit] = useState(false);
  const [editingContent,setEditingContent] = useState(null)
  const [editingCommentId, setEditingCommentId] = useState(null);
  const [replyVisible, setReplyVisible] = useState(null);
  const [isPopOpen, setIsPopOpen] = useState(false);
  const [liked, setLiked] = useState(comment.likedBy?.includes(user?.id)); // Estado local para el "like"

  // Actualizar el "like" solo en el comentario
  const handleLike = async (e, commentId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      console.error("User is not authenticated");
      return;
    }

    // Optimistic UI update: actualizar `liked` antes de hacer la solicitud
    setLiked((prevLiked) => !prevLiked);
    
    try {
      const res = await handleLikeComment(commentId, user.id);
      if (res && res.data) {
        const { likes } = res.data;

        // Actualizar el número de likes en el comentario después de la respuesta
        setComment((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, likes } : comment
          )
        );
      }
    } catch (error) {
      console.error("Error liking the comment:", error);
      // Revertir el cambio local si hubo un error
      setLiked((prevLiked) => !prevLiked);
    }
  };
  const handleEdit = (id,content) => {
    console.log(content)
    console.log(id);
    setIsEdit((prev) => (prev ? null : id));
    setEditingCommentId(id);
    setEditingContent(content); 
  };
  const deleteHandle = (commentId) => { /* lógica de eliminar */ };

  return (
    <div className="bg-gray-100 p-4 rounded-lg shadow-sm">
      {isEdit ? (
        <EditCommentForm
          comment={comment}
          setIsEdit={setIsEdit}
          editingCommentId={editingCommentId}
        />
      ) : (
        <>
          <p className="text-gray-700">{comment.content || editingContent}</p>
          <span className="text-sm text-gray-500">
            {comment.userId.username || "Usuario desconocido"}
          </span>

          <div className="flex space-x-2 mt-2">
            <button
              type="button"
              className="flex items-center space-x-1"
              onClick={(e) => handleLike(e, comment._id)}
            >
              {liked ? <FaHeart /> : <FaRegHeart />}
              <span className="p-1">{liked ? comment.likes + 1 : comment.likes}</span>
            </button>
            <button
              type="button"
              onClick={() => setReplyVisible(replyVisible === comment._id ? null : comment._id)}
            >
              <BiMessageRounded />
            </button>
            <button
              type="button"
              className="flex items-center space-x-1"
              onClick={() => {/* lógica de compartir */}}
            >
              <FaShareAlt />
              <span>Share</span>
            </button>
            {isAuthenticated && user.id === comment.userId._id && (
              <>
                <button type="button" className="flex items-center space-x-1" onClick={() => setIsPopOpen(!isPopOpen)}>
                  <HiDotsHorizontal />
                </button>
                {isPopOpen && (
                  <ActionMenu 
                    commentId={comment._id} 
                    handleEdit={() => handleEdit(comment._id, editingContent)}                     
                    deleteHandle={deleteHandle} 
                  />
                )}
              </>
            )}
          </div>
        </>
      )}

      {comment.responses && comment.responses.length > 0 && (
        <>
          <h4 className="text-sm font-semibold text-gray-600 mt-2">Respuestas:</h4>
          {/* renderizar respuestas */}
        </>
      )}

      {replyVisible === comment._id && (
        <ReplyForm
          commentId={comment._id}
          setReplyVisible={setReplyVisible}
          blog={blog}
          // agregar lógica de envío
        />
      )}
    </div>
  );
};
