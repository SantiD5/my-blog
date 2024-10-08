import { Router } from 'express';
import { login, logout, profile, signup, verifyToken } from '../controllers/auth.controllers.js';
import { authRequired } from '../middleware/validateToken.js';
import { validateSchema } from '../middleware/validator.middleware.js';
import { loginSchema, registerSchema } from '../Schemas/auth.schema.js';
const router = Router()

router.post('/signup',validateSchema(registerSchema),signup)

router.post('/login',validateSchema(loginSchema),login)

router.post('/logout',logout)

router.get('/profile',authRequired,profile)

router.get('/verify',verifyToken)



export default router
