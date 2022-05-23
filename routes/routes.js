import express from "express";

import auth_route from "./auth.route.js";
import user_route from "./user.route.js";
import business_route from "./business.route.js";
// import plan_route from './plan.route.js'

const router = express.Router();

/** @desc: Route for POST login, POST register, GET auth */ 
router.use("/", auth_route);

/** @desc: Route for GET user detail, GET user list, PATCH update */
router.use("/", user_route);

/** @desc: Route for business */
router.use("/", business_route);


// router.use("/", plan_route);

export default router;
