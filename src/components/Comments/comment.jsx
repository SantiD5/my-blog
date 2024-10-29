import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuth } from "../../context/authContext";
import { useComment } from "../../context/commentContext";

export const CommentSection = ({ blog }) => {
  const {
    comments,
    loading,
    createComment,
    getComments,
    setComment,
    handleLikeComment,
    reload
  } = useComment();
  
  const { user } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [replyContents, setReplyContents] = useState({});
  const [replyVisible, setReplyVisible] = useState(null); // Estado para controlar la visibilidad del input de respuesta

  const handleLike = async (e, commentId, userId) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.currentTarget) {
      e.currentTarget.blur();
    }
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    try {
      const res = await handleLikeComment(commentId, userId);
      if (res && res.data) {
        const { likes } = res.data;
        setComment((prevComments) =>
          prevComments.map((comment) =>
            comment.id === commentId ? { ...comment, likes } : comment
          )
        );
      }
    } catch (error) {
      console.error("Error liking the comment:", error);
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
  }, [blog, reload]);

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
    } catch (err) {
      setError("No se pudo enviar el comentario");
      console.log(err);
    }
  };

  const handleReplyChange = (commentId, value) => {
    setReplyContents((prev) => ({
      ...prev,
      [commentId]: value,
    }));
  };

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    const replyContent = replyContents[commentId];
    if (!replyContent.trim()) {
      setError("El contenido de la respuesta no puede estar vacío");
      return;
    }

    setComment((prevComments) =>
      prevComments.map((comment) =>
        comment.id === commentId
          ? {
              ...comment,
              responses: [
                ...comment.responses,
                { content: replyContent, author: "Autor de la respuesta" },
              ],
            }
          : comment
      )
    );
    setReplyContents((prev) => ({ ...prev, [commentId]: "" }));
    setReplyVisible(null); // Ocultar el input después de enviar la respuesta
  };

  if (loading) return <p>Cargando comentarios...</p>;

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
      <div className="p-6 border-t border-gray-200">
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">Comentarios</h2>
        <div className="space-y-4">
          {comments.length ? (
            comments.map((comment) => (
              <div key={comment.id} className="bg-gray-100 p-4 rounded-lg shadow-sm">
                <p className="text-gray-700">{comment.content}</p>
                <span className="text-sm text-gray-500">- {comment.author}</span>

                <div className="flex space-x-2 mt-2">
                  <button
                    type="button"
                    onClick={(e) => handleLike(e, comment._id, comment.userId)}
                  >
                    {comment.likedBy.includes(user.id) ? <FaHeart /> : <FaRegHeart />}
                    {comment.likes}
                  </button>
                  <button
                    type="button"
                    onClick={() => setReplyVisible(comment.id)}
                  >
                    Responder
                  </button>
                </div>

                {comment.responses && comment.responses.length > 0 && (
                  <div className="ml-4 mt-2">
                    <h4 className="text-sm font-semibold text-gray-600">Respuestas:</h4>
                    {comment.responses.map((response, index) => (
                      <div key={index} className="bg-gray-50 p-3 rounded-md shadow-sm">
                        <p className="text-gray-600">{response.content}</p>
                        <span className="text-sm text-gray-500">- {response.author}</span>
                      </div>
                    ))}
                  </div>
                )}

                {replyVisible === comment.id && (
                  <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-4">
                    <textarea
                      className="px-4 py-2 border border-gray-300 rounded-md"
                      placeholder="Agregar una respuesta..."
                      rows="2"
                      value={replyContents[comment.id] || ""}
                      onChange={(e) => handleReplyChange(comment.id, e.target.value)}
                    />
                    <button
                      type="submit"
                      className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Enviar Respuesta
                    </button>
                  </form>
                )}
              </div>
            ))
          ) : (
            <p className="text-gray-500">No hay comentarios todavía.</p>
          )}
        </div>
      </div>

      {error && <p className="text-red-500">{error}</p>}
      <div className="mt-6 flex flex-col">
        <textarea
          className="px-4 py-2 border border-gray-300 rounded-md"
          placeholder="Agregar un comentario..."
          rows="4"
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
        />
        <button
          onClick={handleCommentSubmit}
          className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md"
        >
          Enviar Comentario
        </button>
      </div>
    </div>
  );
};
