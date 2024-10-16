import { Router } from "express";
import { createComment, deleteComment, getComment, getComments, updateComment } from "../controllers/Comment.controller.js";
import { isAdmin } from '../middleware/Admin.js';
import { authRequired } from "../middleware/validateToken.js";
const router = Router()

router.post('/comment',authRequired,createComment)

router.get('/comment/:id',getComment)
router.delete('/comment/:id',authRequired,isAdmin,deleteComment)

router.patch('/comment/:id',authRequired,isAdmin,updateComment)
router.get('/comments',getComments)

export default router