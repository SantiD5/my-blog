import { Router } from 'express'
import { login, signup } from '../controllers/auth.controllers.js'
import { createBlog } from '../controllers/Blog.controller.js'
const router = Router()

router.post('/signup',signup)

router.post('/login',login)

router.post('/blog',createBlog)
export default router