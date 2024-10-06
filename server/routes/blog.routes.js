import { Router } from "express";
import { createBlog, deleteBlog, getblog, getBlogs, updateBlog } from "../controllers/Blog.controller.js";
import { authRequired } from "../middleware/validateToken.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { zodblogSchema } from "../Schemas/blog.schema.js";
const router = Router()

router.post('/blogs',authRequired,validateSchema(zodblogSchema),createBlog)
router.get('/blog/:id',authRequired,getblog)
router.delete('/blog/:id',authRequired,deleteBlog)
router.put('/blog/:id',authRequired,updateBlog)
router.get('/blogs',getBlogs)
router.get('/dashboard',authRequired,(req,res)=>{
  res.send("dashboard anashex")
})

export default router