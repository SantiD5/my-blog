import cookieParser from 'cookie-parser';
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
 const app = express()
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.json())
app.use('/api',authRoutes)
app.use('/api',blogRoutes)
 export default app