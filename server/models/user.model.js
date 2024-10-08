import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    trim: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: {
    type: String,
    default: "default-avatar.png" // Default avatar for user or admin
  },
  bio: {
    type: String,
    trim: true,
    maxlength: 160 // Optional bio for profile
  },
  isVerified: {
    type: Boolean,
    default: false // Email verification status
  },
  bookmarks: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "BlogPost" // Bookmark feature for saving posts
  }],
  role: {
    type: String,
    enum: ["user", "admin"], // Role definition, more roles can be added later
    default: "user"
  },
  permissions: {
    canDeletePosts: {
      type: Boolean,
      default: false // Only admins would have this true
    },
    canEditUsers: {
      type: Boolean,
      default: false // Only admins would have this true
    },
    canManageContent: {
      type: Boolean,
      default: false // Only admins would have this true
    }
  },
  resetPasswordToken: {
    type: String
  },
  resetPasswordExpires: {
    type: Date
  }
}, {
  timestamps: true
});
export default mongoose.model("User",userSchema)