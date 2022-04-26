import express from "express";

import { verifyToken, verifyRole } from "../middlewares/verify.js";
import {
  get_many_business,
  get_business,
  add_business,
  update_business
} from "../controllers/business/business.controller.js";

const business_route = express.Router();

//prettier-ignore
business_route.route('/business')
    .post(verifyToken,add_business)
    .get(verifyToken,get_many_business)

//prettier-ignore
business_route
    .route("business/:id")
    .get(verifyToken, get_business)
    .patch(verifyToken, update_business);

    //prettier-ignore

// business_route
//     .route("business/:id/certificate")
//     .get(verifyToken, get_certificate)
//     .patch(verifyToken, update_a_business);

export default business_route;
