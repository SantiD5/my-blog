import React, { useEffect, useRef, useState } from "react";
import { BiMessageRounded } from "react-icons/bi";
import { FaHeart, FaRegHeart, FaShareAlt } from "react-icons/fa";
import { HiDotsHorizontal } from "react-icons/hi";
import { useAuth } from "../../context/authContext";
import { useComment } from "../../context/commentContext";
import { Alert } from "../Alert/Alert";
export const CommentSection = ({ blog }) => {
  const {
    comments,
    loading,
    createComment,
    getComments,
    setComment,
    handleLikeComment,
    reload,
    deleteCommentById,
  } = useComment();
  const {isAuthenticated} = useAuth()
  const { user, getUserByid, userById, setUserById } = useAuth();
  const [newComment, setNewComment] = useState("");
  const [error, setError] = useState("");
  const [replyContents, setReplyContents] = useState({});
  const [replyVisible, setReplyVisible] = useState(null);
  const [isPopOpen, setIsPopOpen] = useState(null);
  const [isTextAreaFocused, setIsTextAreaFocused] = useState(false);
  const [parentId, setParentId] = useState(null);
  const [isAlert, setIsAlert] = useState(null);
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
  const handleLike = async (e, commentId) => {
    e.preventDefault();
    e.stopPropagation();
    if (!user) {
      console.error("User is not authenticated");
      return;
    }
    try {
      const res = await handleLikeComment(commentId, user.id);
      if (res && res.data) {
        const { likes } = res.data;
        setComment((prevComments) =>
          prevComments.map((comment) =>
            comment._id === commentId ? { ...comment, likes } : comment
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
    } catch (e) {
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
  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();
    if (!replyContents[commentId]?.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }
    try {
      const newReplyData = await createComment({
        blogId: blog,
        content: replyContents[commentId],
        parentId: commentId,
      });
      setReplyContents((prev) => ({ ...prev, [commentId]: "" }));
      setError("");
      setComment((prevComments) => [...prevComments, newReplyData.data]);
    } catch (e) {
      setError("No se pudo enviar el comentario");
      console.log(e);
    }
  };
  const getUserByIdComment = async (id) => {
    try {
      const res = await getUserByid(id);
      if (res.data) {
        setUserById(res.data);
      }
    } catch (e) {
      console.log("Error fetching user by ID:", e);
    }
  };
  if (loading) return <p>Cargando comentarios...</p>;

  const renderResponses = (responses) => {
    return (
      <div className="ml-4">
        {responses.map((response) => {
          return (
            <div
              key={response._id}
              className="bg-gray-50 p-3 rounded-md shadow-sm mt-2"
            >
              <p className="text-gray-600">{response.content}</p>
              <span className="text-sm text-gray-500">
                {userById || "Usuario desconocido"}
              </span>
              <div className="flex space-x-2 mt-2">
                <button
                  type="button"
                  className="flex items-center space-x-1"
                  onClick={(e) => handleLike(e, response._id)}
                >
                  {response.likedBy?.includes(user?.id) ? (
                    <FaHeart />
                  ) : (
                    <FaRegHeart />
                  )}
                  <span className="p-1">{response.likes}</span>
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setReplyVisible(
                      replyVisible === response._id ? null : response._id
                    )
                  }
                >
                  <BiMessageRounded />
                </button>
                <button
                  type="button"
                  className="flex items-center space-x-1"
                  onClick={(e) => handleShare(e, response._id)}
                >
                  <FaShareAlt />
                  <span>Share</span>
                </button>
                {isAuthenticated && user.id === response.userId._id ? (
                  <>
                    <button
                      type="button"
                      className="flex items-center space-x-1"
                      onClick={() => popOver(response._id)}
                    >
                      <HiDotsHorizontal />
                    </button>
                    {isPopOpen === response._id && (
                    <div className="!ml-[174px] absolute mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                        Editar comentario
                      </button>

                      <button
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                        onClick={deleteHandle}
                      >
                        Eliminar comentario
                      </button>
                      {isAlert ? null : (
                        <Alert
                          cancel={() => deleteHandle()}
                          onConfirm={() => handleDeleteComment(response._id)}
                        />
                      )}
                    </div>
                  )}
                  </>
                ) : null}

              </div>

              {replyVisible === response._id && (
                <form
                  onSubmit={(e) => handleReplySubmit(e, response._id)}
                  className="mt-4 relative"
                >
                  <textarea
                    className="px-4 py-2 border border-gray-300 rounded-md w-full resize-none"
                    placeholder="Agregar una respuesta..."
                    rows="2"
                    value={replyContents[response._id] || ""}
                    onChange={(e) =>
                      handleReplyChange(response._id, e.target.value)
                    }
                  />
                  <div className="absolute right-0 top-0 flex space-x-2 mt-2">
                    <button
                      type="submit"
                      className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                      Enviar Respuesta
                    </button>
                    <button
                      type="button"
                      onClick={() => setReplyVisible(null)}
                      className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              )}

              {/* Renderiza respuestas anidadas */}
              {response.responses &&
                response.responses.length > 0 &&
                renderResponses(response.responses)}
            </div>
          );
        })}
      </div>
    );
  };

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
        <div className="space-y-4">
          {comments.length ? (
            comments.map((comment) => (
              <div
                key={comment._id}
                className="bg-gray-100 p-4 rounded-lg shadow-sm"
              >
                <p className="text-gray-700">{comment.content}</p>
                <span className="text-sm text-gray-500">
                  {userById || "Usuario desconocido"}
                </span>

                <div className="flex space-x-2 mt-2">
                  <button
                    type="button"
                    className="flex items-center space-x-1"
                    onClick={(e) => handleLike(e, comment._id)}
                  >
                    {comment.likedBy?.includes(user?.id) ? (
                      <FaHeart />
                    ) : (
                      <FaRegHeart />
                    )}
                    <span className="p-1">{comment.likes}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      setReplyVisible(
                        replyVisible === comment._id ? null : comment._id
                      )
                    }
                  >
                    <BiMessageRounded />
                  </button>
                  <button
                    type="button"
                    className="flex items-center space-x-1"
                    onClick={(e) => handleShare(e, comment._id)}
                  >
                    <FaShareAlt />
                    <span>Share</span>
                  </button>
                  {isAuthenticated && user.id === comment.userId._id ? (
                  <>
                    <button
                    type="button"
                    className="flex items-center space-x-1"
                    onClick={() => popOver(comment._id)}
                  >
                      <HiDotsHorizontal />
                    </button>
                    {isPopOpen === comment._id && (
                    <div className="!ml-[174px] absolute mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <button className="w-full px-4 py-2 text-left text-gray-700 hover:bg-gray-100">
                        Editar comentario
                      </button>

                      <button
                        className="w-full px-4 py-2 text-left text-red-600 hover:bg-red-100"
                        onClick={deleteHandle}
                      >
                        Eliminar comentario
                      </button>
                      {isAlert ? null : (
                        <Alert
                          cancel={() => deleteHandle()}
                          onConfirm={() => handleDeleteComment(comment._id)}
                        />
                      )}
                    </div>
                  )}
                  </>
                ) : null}
                  
            
                </div>

                {comment.responses && comment.responses.length > 0 && (
                  <>
                    <h4 className="text-sm font-semibold text-gray-600 mt-2">
                      Respuestas:
                    </h4>
                    {renderResponses(comment.responses)}
                  </>
                )}

                {replyVisible === comment._id && (
                  <form
                    onSubmit={(e) => handleReplySubmit(e, comment._id)}
                    className="mt-4 relative"
                  >
                    <textarea
                      className="px-4 py-2 border border-gray-300 rounded-md w-full resize-none"
                      placeholder="Agregar una respuesta..."
                      rows="2"
                      value={replyContents[comment._id] || ""}
                      onChange={(e) =>
                        handleReplyChange(comment._id, e.target.value)
                      }
                    />
                    <div className="absolute right-0 top-0 flex space-x-2 mt-2">
                      <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                      >
                        Enviar Respuesta
                      </button>
                      <button
                        type="button"
                        onClick={() => setReplyVisible(null)}
                        className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
                      >
                        Cancelar
                      </button>
                    </div>
                  </form>
                )}
              </div>
            ))
          ) : (
            <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
          )}
        </div>
      </div>
    </div>
  );
};
