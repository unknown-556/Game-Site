import express from 'express'
import authRoute from './authRoute.js'
import gameRoute from './gameRoute.js'
import userRoute from './userRoute.js'


const router = express.Router()

router.use('/auth', authRoute)
router.use('/game', gameRoute)
router.use('/user', userRoute)

export default router