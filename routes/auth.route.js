import express from "express";

import { login, create_account,create_admin_account,change_user_password, log_out } from "../controllers/auth/auth.controller.js";
import { verifyToken,verifyRole } from "../middlewares/verify.js";
import { user_auth } from "../controllers/auth/auth.controller.js";

const auth_route = express.Router();


auth_route.route("/register/admin/:key").post(create_admin_account); // Tạo tài khoản admin

auth_route.route("/register").post(verifyRole, create_account); // Tạo tài khoản người dùng

auth_route.route("/login").post(login); // Đăng nhập

auth_route.route("/auth").get(verifyToken, user_auth); // Xác thực tài khoản, khi người dùng đăng nhập,

// dùng api này để xem là người dùng đã đăng nhập chưa.


auth_route.route('/user/changepassword').post(verifyToken,change_user_password);

auth_route.route('/user/logout').delete(verifyToken,log_out);

export default auth_route;
