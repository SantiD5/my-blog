import mongoose from 'mongoose';

export const blogSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  slug: { 
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  tags: [{ 
    type: String,
  }],
  date: {
    type: Date,
    default: Date.now,
  },
  updatedAt: { 
    type: Date,
  },
  status: { 
    type: String,
    enum: ['draft', 'published'],
    default: 'draft',
  },user:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
    required:true
  }
},{
timestamps:true
});

export default mongoose.model("blog",blogSchema)