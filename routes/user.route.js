import express from "express";

import { verifyToken, verifyRole } from "../middlewares/verify.js";
import { update_user, delete_user, get_user_detail,get_many_user } from "../controllers/user/users.controller.js";
import { user_auth } from "../controllers/auth/auth.controller.js";

const user_route = express.Router();

//prettier-ignore
user_route
    .route("/users")
    .get(verifyRole, get_many_user); // admin - lấy các danh sách tài khoản.

//prettier-ignore
/*
  Lấy hết dữ liệu dùng user.findOne({id: req.params.id})
*/

user_route
  .route("/user/:id")
  .get(verifyToken, get_user_detail) // admin / user - xem thông tin tài khoản
  .patch(verifyToken, update_user) // admin / user - cập nhật thông tin tài khoản
  .delete(verifyRole, delete_user); //  admin - xóa tài khoản

export default user_route;
