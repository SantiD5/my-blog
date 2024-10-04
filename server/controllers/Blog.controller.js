import blog from '../models/blog.model.js'

export const createBlog = async (req,res) =>{
  const {title,description,author,slug,tags,date,updatedAt,status} = req.body
  const newBlog = new blog({
    title,
    description,
    author,
    slug,
    tags,
    date,
    updatedAt,
    status
  }) 
  try{
    const blogSaved = await newBlog.save()
    res.send("creando...")
    res.json(blogSaved)

  }catch(e){
    console.log(e)
  }
}