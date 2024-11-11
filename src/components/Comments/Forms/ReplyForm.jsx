import { useState } from "react";
import { useComment } from "../../../context/commentContext";

const ReplyForm = ({ commentId, setReplyVisible, blog }) => {
  const { createComment, setComment } = useComment();
  const [error, setError] = useState("");
  const [replyContent, setReplyContent] = useState("");

  const handleReplySubmit = async (e) => {
    e.preventDefault();
    
    if (!replyContent.trim()) {
      setError("El comentario no puede estar vacío");
      return;
    }

    try {
      const newReplyData = await createComment({
        blogId: blog,
        content: replyContent,
        parentId: commentId,
      });

      // Reseteamos el contenido del comentario
      setReplyContent("");
      setError("");
      
      // Aquí actualizas los comentarios para reflejar la nueva respuesta
      setComment((prevComments) => [...prevComments, newReplyData.data]);
    } catch (e) {
      setError("No se pudo enviar el comentario");
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleReplySubmit} className="mt-4 relative">
      <textarea
        className="px-4 py-2 border border-gray-300 rounded-md w-full resize-none"
        placeholder="Agregar una respuesta..."
        rows="2"
        value={replyContent}
        onChange={(e) => setReplyContent(e.target.value)} // Usamos replyContent aquí
      />
      <div className="absolute right-0 top-0 flex space-x-2 mt-2">
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md">
          Enviar Respuesta
        </button>
        <button
          type="button"
          className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          onClick={() => setReplyVisible(null)}
        >
          Cancelar
        </button>
      </div>

      {error && <p className="text-red-500 mt-2">{error}</p>}
    </form>
  );
};

export default ReplyForm;
