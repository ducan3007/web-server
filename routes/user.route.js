import express from "express";

import { verifyToken, verifyRole, verifyRequest } from "../middlewares/verify.js";
import {
  update_user,
  delete_user,
  get_user_detail,
  get_many_user,
  add_work_area,
} from "../controllers/user/users.controller.js";
import { user_auth } from "../controllers/auth/auth.controller.js";

const user_route = express.Router();

user_route.route("/users").get(verifyRole, verifyRequest, get_many_user);

user_route.route("/user/workarea/:id").put(verifyRole, verifyRequest, add_work_area);

user_route
  .route("/user/:id")
  .get(verifyToken, get_user_detail)
  .patch(verifyToken, update_user)
  .delete(verifyRole, delete_user);

export default user_route;
