import express from "express";

import auth_route from "./auth.route.js";
import user_route from "./user.route.js";
import business_route from "./business.route.js";

const router = express.Router();


router.use("/", auth_route);

router.use("/", user_route);

router.use('/',business_route)




export default router;
