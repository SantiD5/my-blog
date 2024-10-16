import Comment from '../models/comments.model.js';
export const checkParentCommentExists = async (req, res, next) => {
  const { parentId } = req.body;
  if (parentId) {
    const parentComment = await Comment.findById(parentId);
    if (!parentComment) {
      return res.status(404).json({ message: 'Parent comment not found' });
    }
  }
  next();
};
