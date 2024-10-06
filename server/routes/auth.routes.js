import { Router } from 'express';
import { login, logout, profile, signup } from '../controllers/auth.controllers.js';
import { createBlog } from '../controllers/Blog.controller.js';
import { authRequired } from '../middleware/validateToken.js';
import { validateSchema } from '../middleware/validator.middleware.js';
import { loginSchema, registerSchema } from '../Schemas/auth.schema.js';
const router = Router()

router.post('/signup',validateSchema(registerSchema),signup)

router.post('/login',validateSchema(loginSchema),login)

router.post('/logout',logout)

router.get('/profile',authRequired,profile)

router.post('/blog',createBlog)

export default router
