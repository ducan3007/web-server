import express from "express";

const plan_route = express.Router();


plan_route.route("/plan").get(get_plan);



export default plan_route;
