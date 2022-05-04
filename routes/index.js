import express from "express";

import auth_route from "./auth.route.js";
import user_route from "./user.route.js";
import business_route from "./business.route.js";
import plan_route from './plan.route.js'

const router = express.Router();


router.use("/", auth_route); // Đăng nhập, tạo tài khoản, xác thực

router.use("/", user_route);

router.use('/', business_route);

router.use('/', plan_route);




export default router;
