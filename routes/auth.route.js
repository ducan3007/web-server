import express from "express";

import { login, create_account,create_admin_account } from "../controllers/auth/auth.controller.js";
import { verifyToken,verifyRole } from "../middlewares/verify.js";
import { user_auth } from "../controllers/auth/auth.controller.js";

const auth_route = express.Router();

auth_route.route("/register/admin/:key").post(create_admin_account);

auth_route.route("/register").post(verifyRole, create_account);

auth_route.route("/login").post(login);

auth_route.route("/auth").get(verifyToken, user_auth);


export default auth_route;
