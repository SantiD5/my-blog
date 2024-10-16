import React, { useEffect, useState } from 'react';
import { useComment } from '../../context/commentContext';

export const CommentSection = ({ postId }) => {
    const { comments, loading, createComment, getComments,setComment } = useComment();
    const [newComment, setNewComment] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
      
      const gettingComments = async()=>{
        try{
          const res =  await getComments(postId);
          console.log(res.data)
          if(res && res.data){
            setComment(res.data)
          }
        }catch(e){
          console.error(e)
        }
      }
     gettingComments()
    }, []);

    const handleCommentSubmit = async (e) => {
        e.preventDefault();
        if (!newComment.trim()) {
            setError('El comentario no puede estar vacío');
            return;
        }

        try {
            await createComment({ postId, text: newComment });
            setNewComment('');
            setError('');
        } catch (err) {
            setError('No se pudo enviar el comentario');
        }
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
    
                  {/* Verificar si el comentario tiene respuestas */}
                  {comment.responses && comment.responses.length > 0 && (
                    <div className="ml-4 mt-2">
                      <h4 className="text-sm font-semibold text-gray-600">Respuestas:</h4>
                      {/* Renderizar solo las respuestas directas */}
                      {comment.responses.map((response) => (
                        <div key={response.id} className="bg-gray-50 p-3 rounded-md shadow-sm">
                          <p className="text-gray-600">{response.content}</p>
                          <span className="text-sm text-gray-500">- {response.author}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-gray-500">No hay comentarios todavía.</p>
            )}
          </div>
        </div>
    
        {/* Formulario para agregar comentarios */}
        {error && <p className="text-red-500">{error}</p>}
        <div className="mt-6 flex flex-col">
          <textarea
            className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300"
            placeholder="Agregar un comentario..."
            rows="4"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
          />
          <button
            onClick={handleCommentSubmit}
            className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-md hover:bg-blue-600 transition duration-300"
          >
            Enviar Comentario
          </button>
        </div>
      </div>
    );
  }    