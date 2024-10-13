import { Router } from "express";
import { createBlog, deleteBlog, getblog, getBlogs, updateBlog } from "../controllers/Blog.controller.js";
import { isAdmin } from '../middleware/Admin.js';
import { authRequired } from "../middleware/validateToken.js";
import { validateSchema } from "../middleware/validator.middleware.js";
import { zodblogSchema } from "../Schemas/blog.schema.js";
const router = Router()

router.post('/blogs',authRequired,validateSchema(zodblogSchema),createBlog)
router.get('/gblogs/:id',getblog)
router.delete('/blog/:id',authRequired,isAdmin,deleteBlog)

router.patch('/blog/:id',authRequired,isAdmin,updateBlog)
router.get('/blogs',getBlogs)
router.get('/dashboard',authRequired,isAdmin)

export default router