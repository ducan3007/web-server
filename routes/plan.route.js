import express from "express";

import { verifyToken, verifyRequest } from "../middlewares/verify.js";

import {
  create_plan,
  get_plan_detail,
  get_plans,
  update_plan,
  add_samples,
  update_samples,
} from "../controllers/plan/plan.controller.js";

const plan_route = express.Router();

plan_route.route("/plan").get(verifyToken, verifyRequest, get_plans).post(verifyToken, verifyRequest, create_plan);

plan_route
  .route("/plan/:id")
  .get(verifyToken, verifyRequest, get_plan_detail)
  .patch(verifyToken, verifyRequest, update_plan);

plan_route
  .route("/plan/sample/:id")
  .put(verifyToken, verifyRequest, add_samples)
  .patch(verifyToken, verifyRequest, update_samples);

export default plan_route;
