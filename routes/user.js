import express from "express";

import { verifyToken } from "../middlewares/verifyToken.js";
import {updateUser} from "../controllers/users.js";

const User = express.Router();

// put, patch de update restAPI

User.patch('/:id',verifyToken,updateUser) // api/user:id



export default User;
