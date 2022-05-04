import express from "express";

const plan_routes = express.Router();


plan_routes.route("/plan/:id").get(get_plan);



export default plan_routes;
