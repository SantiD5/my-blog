import Comment from "../models/comments.model.js";

// Create a new comment

// Create a new comment
export const createComment = async (req, res) => {
  const { content, blogId, parentId } = req.body;

  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }

  // Validar que el contenido no esté vacío
  if (!content || content.trim() === '') {
    return res.status(400).json({ message: 'Content is required' });
  }

  try {
    // Verificar si ya existe un comentario igual para evitar duplicados
    const existingComment = await Comment.findOne({ content, blog: blogId, parentId });
    if (existingComment) {
      return res.status(409).json({ message: 'Comment already exists' });
    }

    // Crear un nuevo comentario
    const newComment = new Comment({
      content,
      userId: req.user.id,
      blog: blogId,
      parentId: parentId || null,  // Establecer parentId como null si no existe
      edited: false,
    });

    const commentSaved = await newComment.save();

    // Si el comentario es una respuesta (tiene parentId), actualizamos el comentario padre
    if (parentId) {
      const parentComment = await Comment.findById(parentId);
      if (!parentComment) {
        return res.status(404).json({ message: "Parent comment not found" });
      }

      // Agregar solo el ID del nuevo comentario en el campo responses del comentario padre
      parentComment.responses.push(commentSaved._id);
      await parentComment.save();
      console.log("Parent comment updated with new response ID:", parentComment.responses);
    }

    return res.status(201).json({
      message: 'Comment successfully created',
      comment: commentSaved,
    });
  } catch (e) {
    console.error("Error creating comment:", e);
    return res.status(500).json({
      message: 'Internal Server Error: Unable to create the comment',
      error: e.message,
    });
  }
};





// Get a single comment by ID
export const getComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id).populate('userId', 'name');
    if (!comment) {
      return res.status(404).json({ message: "Comment does not exist" });
    }
    res.json(comment);
  } catch (error) {
    console.error("Error fetching comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Función para obtener las respuestas de un comentario
const getCommentResponses = async (commentId) => {
  const responses = await Comment.find({ parentId: commentId })
    .populate('userId', 'name')
    .exec();
  
  // Para cada respuesta, busca sus propias respuestas recursivamente
  const responsesWithNested = await Promise.all(responses.map(async (response) => {
    response = response.toObject(); // Convierte a objeto
    response.responses = await getCommentResponses(response._id); // Llama recursivamente
    return response;
  }));

  return responsesWithNested;
};

export const getComments = async (req, res) => {
  const { postId } = req.query;
  if (!postId) {
    return res.status(400).json({ message: "Post ID is required." });
  }

  try {
    // Obtener solo los comentarios principales
    const comments = await Comment.find({ blog: postId, parentId: null })
      .populate('userId', 'name')
      .exec();

    // Para cada comentario, obtener sus respuestas
    const commentsWithResponses = await Promise.all(comments.map(async (comment) => {
      comment = comment.toObject(); // Convierte a objeto
      comment.responses = await getCommentResponses(comment._id); // Llama a la función recursiva
      return comment;
    }));

    res.json(commentsWithResponses);
  } catch (error) {
    console.error("Error fetching comments:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// Delete a comment
export const deleteComment = async (req, res) => {
  try {
    const deletedComment = await Comment.findByIdAndDelete(req.params.id);
    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment deleted successfully", comment: deletedComment });
  } catch (error) {
    console.error("Error deleting comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// Update a comment
export const updateComment = async (req, res) => {
  try {
    const updatedComment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true, // Ensure validators are run
    });

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found" });
    }
    res.json({ message: "Comment updated successfully", comment: updatedComment });
  } catch (error) {
    console.error("Error updating comment:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

// controllers/commentController.js

export const likeComment = async (req, res) => {
  try {
    const commentId = req.params.id;
    const userId = req.user.id; // Supongamos que tienes el ID del usuario en req.user
    console.log(`userId: ${userId}`)
    console.log(commentId)
    console.log(`${JSON.stringify(req.user.id)}`)
    // Busca el comentario
    const comment = await Comment.findById(commentId);
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    // Verifica si el usuario ya ha dado like
    if (comment.likedBy.includes(userId)) {
      // Si ya dio like, quita el like
      comment.likes--;
      comment.likedBy = comment.likedBy.filter(id => id.toString() !== userId.toString());
    } else {
      // Si no ha dado like, añádelo y aumenta el contador
      comment.likes++;
      comment.likedBy.push(userId);
    }

    await comment.save(); // Guarda los cambios
    res.json({ message: "Like updated successfully", likes: comment.likes , likedBy:comment.likedBy});
  } catch (e) {
    console.error("Error updating comment", e);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getLikes = async (req,res) =>{
  const {postId} = req.query;
  if(!postId){
    return res.status(400).json({message:"PostId not found"})
  }
  try{

  }catch(e){
    console.error(e)
  }
}
