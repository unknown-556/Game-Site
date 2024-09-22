import express from 'express'

import {addReview} from '../controllers/userControllers.js'
import auth from '../middlewares/auth.js'

const router = express.Router()

router.post('/review', auth, addReview )

export default router