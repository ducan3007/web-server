import express from "express";

import Auth from "./auth.js";
import User from './user.js'

const router = express.Router();

router.use("/",Auth)
router.use('/user',User);

export default router;