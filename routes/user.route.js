import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {updateUser} from "../controllers/users.js";

const user_router = express.Router();

// put, patch de update restAPI

user_router.patch('/:id',verifyToken,updateUser) // api/user:id



export default user_router;
