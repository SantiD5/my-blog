import mongoose from 'mongoose';

export const blogSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',  // Reference to the User model
  },
  description:{
    type:String,
    required:true
  },
  content: {
    type: String,
    required: true,
  },
  title: {
    type: String,
    required: true,
    unique: true,
  },
  image: {
    type: String,
    default:
      'https://www.hostinger.com/tutorials/wp-content/uploads/sites/2/2021/09/how-to-write-a-blog-post.png',
  },
  category: {
    type: String,
    default: 'uncategorized',
  },
  slug: {
    type: String,
    required: true,
    unique: true,
  },
},
{ timestamps: true });

export default mongoose.model("blog",blogSchema)