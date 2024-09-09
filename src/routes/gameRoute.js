import express from 'express'

import { addGame, getAll, getSingle, deleteSingle } from "../controllers/gameController.js";
import auth from '../middlewares/auth.js';
import upload from '../config/cloudinary.js';

const router = express.Router()

router.post("/add", auth, upload.single('image'),  addGame )
router.get("/getAll", auth, getAll)
router.get("/getSingle/:id", auth, getSingle)
router.delete("/deleteGame/:id", auth, deleteSingle)

export default router