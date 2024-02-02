import express from 'express'
import { user, userGet } from '../controller/user.controller.js'
const router=express.Router()
router.post('/user',user)
router.get('/user',userGet)


export default router