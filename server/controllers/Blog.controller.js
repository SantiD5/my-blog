import blog from '../models/blog.model.js';

export const createBlog = async (req, res) => {
  const { title, description, author, slug, tags, date, updatedAt, status } = req.body;

  // Ensure req.user is defined and contains the id
  if (!req.user || !req.user.id) {
    return res.status(401).json({ message: 'Unauthorized: No user found' });
  }
  const newBlog = new blog({
    title,
    description,
    author,
    slug,
    tags,
    date,
    updatedAt,
    status,
    user: req.user.id, // Attach the user ID from the authentication middleware
  });
  try {
    const blogSaved = await newBlog.save();
        return res.status(201).json({
      message: 'Blog successfully created',
      blog: blogSaved,
    });
  } catch (e) {
    console.error(e);
    return res.status(500).json({
      message: 'Internal Server Error: Unable to create blog',
      error: e.message,
    });
  }
};


export const getblog = async(req,res)=>{
  const blogId = await blog.findById(req.params.id)
  if(!blogId) res.send(404).json({message:'The blog doesnt exist'})
  res.json(blogId)
}

export const getBlogs = async (req,res)=>{
  const blogs = await blog.find()
  if(!blogs) res.send(404).json({message:'Blog not found'})
  res.json(blogs)
  
}
export const deleteBlog = async (req,res)=>{
  const blogId = await blog.findByIdAndDelete(req.params.id)
  if(!blogId) res.send(404).json({message:'Blog not found'})
  res.json(blogId)
  
}
export const updateBlog = async (req,res)=>{
  const blogId = await blog.findByIdAndUpdate(req.params.id,req.body,{
    new:true
  })
  if(!blogId) res.send(404).json({message:'Blog not found'})
  res.json(blogId)
  
}