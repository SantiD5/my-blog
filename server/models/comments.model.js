// models/Comment.js

import mongoose from "mongoose";

const CommentSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  blog: { type: mongoose.Schema.Types.ObjectId, ref: "Blog", required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  dislikes: { type: Number, default: 0 },
  responses: [{ type: mongoose.Schema.Types.ObjectId, ref: "Comment" }],
  edited: { type: Boolean, default: false },
  parentId: { type: mongoose.Schema.Types.ObjectId, ref: "Comment", default: null }, // Comentario padre
}, {
  timestamps: true // Agrega createdAt y updatedAt automáticamente
});


export default mongoose.model("Comment", CommentSchema);
