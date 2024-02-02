import express from 'express'
import { login, signup,google, updateUser } from '../controller/auth.controller.js'
import { verifyToken } from '../utils/verifyToken.js'


const router=express.Router()

router.post('/signup',signup)
router.post('/login',login)
router.post('/google',google)
router.post('/update/:id',verifyToken, updateUser)

export default router