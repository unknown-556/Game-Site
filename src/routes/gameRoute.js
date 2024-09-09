import express from 'express'

import { addGame, getAll, getSingle, deleteSingle } from "../controllers/gameController";
import auth from '../middlewares/auth';
import upload from '../config/cloudinary';

const router = express.Router()

router.post("/add", auth, upload.single('image'),  addGame )
router.get("/getAll", auth, getAll)
router.get("/getSingle/:id", auth, getSingle)
router.delete("/deleteGame/:id", auth, deleteSingle)

export default router