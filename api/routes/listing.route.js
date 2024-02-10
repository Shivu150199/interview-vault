import express from 'express'
import { createListing } from '../controller/listing.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router =express.Router()

router.post('/create',verifyToken,createListing)

export default router   