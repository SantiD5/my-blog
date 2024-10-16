import cookieParser from 'cookie-parser';
import cors from 'cors';
import express from 'express';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import commentRoutes from './routes/comments.routes.js';

 const app = express()
 app.use(cors({
  origin:'http://localhost:5173',
  credentials:true
 }))
app.use(cookieParser());
app.use(morgan('dev'))
app.use(express.json())
app.use('/api',authRoutes)
app.use('/api',blogRoutes)
app.use('/api',commentRoutes)
 export default app