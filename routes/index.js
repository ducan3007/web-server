import express from "express";

import auth_router from "./auth.route.js";
import user_router from "./user.route.js";

const router = express.Router();




router.use("/", auth_router);
router.use("/user", user_router);



export default router;
