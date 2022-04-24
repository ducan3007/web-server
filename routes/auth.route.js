import express from "express";

import { signUp, signIn } from "../controllers/users.js";
import { verifyToken } from "../middlewares/verifyToken.js";
import { user_auth } from "../controllers/auth.js";

const auth_router = express.Router();

auth_router.route("/signup").post(signUp); // api/signup

auth_router.route("/signin").post(signIn); // api/signin

auth_router.route("/auth").get(verifyToken, user_auth);

export default auth_router;
