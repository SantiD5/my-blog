import { Comment } from './comment.jsx';

export const CommentList = ({ comments, user, isAuthenticated, blog }) => {
  // Función recursiva para manejar respuestas de respuestas
  const renderResponses = (responses) => {
    return responses.map((response) => (
      <div key={response._id} className="ml-4 space-y-2">
        <Comment 
          comment={response} 
          user={user} 
          isAuthenticated={isAuthenticated} 
          blog={blog}
        />
        {response.responses && response.responses.length > 0 && renderResponses(response.responses)}
      </div>
    ));
  };

  return (
    <div className="space-y-4">
      {comments.length ? (
        comments.map((comment) => (
          <div key={comment._id}>
            <Comment 
              comment={comment} 
              user={user} 
              isAuthenticated={isAuthenticated} 
              blog={blog}
            />
            {/* Aquí se renderizan las respuestas de un comentario, y las respuestas de esas respuestas */}
            {comment.responses && comment.responses.length > 0 && (
              <div className="ml-4 space-y-2">
                {renderResponses(comment.responses)}
              </div>
            )}
          </div>
        ))
      ) : (
        <p>No hay comentarios aún. ¡Sé el primero en comentar!</p>
      )}
    </div>
  );
};
