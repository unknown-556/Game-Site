import express from 'express'
import authRoute from './authRoute.js'
import gameRoute from './gameRoute.js'

const router = express.Router()

router.use('/auth', authRoute)
router.use('/game', gameRoute)

export default router