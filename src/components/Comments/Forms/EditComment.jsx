import React, { useRef, useState } from "react";
import { useComment } from "../../../context/commentContext.jsx";
const EditCommentForm = ({ comment, setIsEdit ,editingCommentId}) => {
  const {
    setComment,
    editCommentById
  } = useComment();
  const [newComment, setNewComment] = useState("");
  const [editComment, setEditComment] = useState("");
  const [error, setError] = useState("");
  const [replyContents, setReplyContents] = useState({});
  const [editContents, setEditContents] = useState({});
  const popoverRef = useRef(null);
  const [editContent, setEditContent] = useState(comment.content);
  const handleCommentEdit= async (e) => {
    e.preventDefault();
    console.log(editContent)
    console.log(editingCommentId)

    if (!editContent.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }
    try {
      const editCommentData = await editCommentById(
        editingCommentId,
        { content: editContent }      
      );
      console.log(editCommentData)
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

  return (
    <form onSubmit={(e)=>handleCommentEdit(e)} className="mt-4 p-4 bg-gray-50 border border-gray-300 rounded-md shadow-md">
      <textarea
        className="px-4 py-2 border border-gray-300 rounded-md w-full resize-none"
        placeholder="Editar comentario..."
        rows="4"
        value={editContent}
        onChange={(e) => setEditContent(e.target.value)}
      />
      <div className="mt-2 flex justify-end space-x-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">Guardar</button>
        <button type="button" className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md" onClick={() => setIsEdit(false)}>Cancelar</button>
      </div>
    </form>
  );
};

export default EditCommentForm