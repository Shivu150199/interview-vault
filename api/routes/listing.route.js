import express from 'express'
import { createListing,getListing,deleteListing } from '../controller/listing.controller.js'
import { verifyToken } from '../utils/verifyToken.js'

const router =express.Router()

router.post('/create',verifyToken,createListing)
router.get('/listing/:id',verifyToken,getListing)
router.delete("/listing/:id",verifyToken,deleteListing)


export default router;