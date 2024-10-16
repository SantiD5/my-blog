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

// Get comments by blog post ID
export const getComments = async (req, res) => {
  const { postId } = req.query;
  if (!postId) {
    return res.status(400).json({ message: "Post ID is required." });
  }

  try {
    const comments = await Comment.find({ blog: postId , parentId: null})
      .populate('userId', 'name')
      .populate('responses')
      .exec();

    const uniqueComments = Array.from(new Set(comments.map(comment => comment._id.toString())))
      .map(id => comments.find(comment => comment._id.toString() === id));

    res.json(uniqueComments);
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
