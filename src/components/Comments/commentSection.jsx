import React, { useEffect, useRef, useState } from "react";
import { useAuth } from "../../context/authContext";
import { useComment } from "../../context/commentContext";
import { CommentList } from "./commentList";
export const CommentSection = ({ blog }) => {
  const {
    comments,
    loading,
    createComment,
    getComments,
    setComment,
    reload,
    deleteCommentById,
    editCommentById
  } = useComment();
  const { isAuthenticated } = useAuth();
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [error, setError] = useState("");
  const [replyContents, setReplyContents] = useState({});
  const [editContents, setEditContents] = useState({});
  const [replyVisible, setReplyVisible] = useState(null);
  const [isPopOpen, setIsPopOpen] = useState(null);
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
  const [parentId, setParentId] = useState(null);
  const [isAlert, setIsAlert] = useState(null);
  const [isEdit, setIsEdit] = useState(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (popoverRef.current && !popoverRef.current.contains(event.target)) {
        setIsPopOpen({ id: null, open: false });
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);
  const cancelEdit = () => {
    setIsEdit(false); // Actualiza el estado isEdit o el estado que estés utilizando para controlar el modo de edición
    setEditComment("");
  };

  const popOver = (commentId) => {
    setIsPopOpen(isPopOpen === commentId ? null : commentId);
    console.log(commentId);
  };
  const deleteHandle = () => {
    setIsAlert((prev) => (prev ? null : true));
  };

  const handleDeleteComment = async (commentId) => {
    try {
      const res = await deleteCommentById(commentId);
      if (res && res.data) {
        setComment(res.data);
      }
    } catch (e) {
      console.error(e);
    }
  };
  
  useEffect(() => {
    const gettingComments = async () => {
      try {
        const res = await getComments(blog);
        if (res && res.data) {
          setComment(res.data);
        }
      } catch (e) {
        console.error(e);
      }
    };
    gettingComments();
  }, [blog]);
  const handleCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }
    try {
      const newCommentData = await createComment({
        blogId: blog,
        content: newComment,
      });
      setNewComment("");
      setError("");
      setComment((prevComments) => [...prevComments, newCommentData.data]);
    } catch (e) {
      setError("No se pudo enviar el comentario");
      console.log(e);
    }
  };
  const handleCommentEdit= async (e) => {
    e.preventDefault();
    console.log(`this is my blog ${blog}`)
    console.log(editComment)

    if (!editComment.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }
    try {
      const editCommentData = await editCommentById(
        editingCommentId,
        { content: editComment }      );
      setNewComment("");
      setError("");
      setComment((prevComments) => {
        const index = prevComments.findIndex((comment) => comment._id === editCommentData.data._id);
        if (index === -1) return prevComments; // If comment not found, return unchanged state
      
        const updatedComments = [...prevComments];
        updatedComments[index] = editCommentData.data; // Update specific comment
      
        return updatedComments;
      });  
      }catch (e){
      setError("No se pudo enviar el comentario");
      console.log(e);
    }
  };
  const handleReplyChange = (commentId, value) => {
    setReplyContents((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };
  const editReplyChange = (commentId, value) => {
    setEditContents((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };


  if (loading) return <p>Cargando comentarios...</p>;


  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-t border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Comentarios
        </h2>
        <form onSubmit={handleCommentSubmit} className="mt-4">
          <textarea
            className="px-4 py-2 border border-gray-300 rounded-md w-full resize-none"
            placeholder="Agregar un comentario..."
            rows="3"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <div className="flex justify-end mt-2">
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md"
            >
              Enviar Comentario
            </button>
          </div>
          {error && <p className="text-red-500">{error}</p>}
        </form>
        <CommentList comments={comments} user={user} isAuthenticated={isAuthenticated} blog={blog}  />
   
      </div>
    </div>
  );
};
