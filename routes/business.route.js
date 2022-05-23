import express from "express";

import { verifyToken, verifyRole } from "../middlewares/verify.js";
import {
  get_many_business,
  get_business,
  add_business,
  update_business,
  create_business
} from "../controllers/business/business.controller.js";

const business_route = express.Router();


//prettier-ignore

/*
  api này dành cho các cơ sở kinh doanh
  @POST: Thêm một cơ sở kinh doanh
  @GET: lấy tất cả các cơ sở kinh doanh
*/
business_route.route('/create_business')
    .post(verifyToken, create_business)
    

//prettier-ignore


business_route.route('/business')
    .get(verifyToken, get_many_business)
/*

  api này dành cho các cơ sở kinh doanh

  @GET: lấy tất cả các cơ sở kinh doanh
  

*/
business_route
    .route("/business/get_business").get(verifyToken, get_business);


    
business_route
    .route("/business/update_business").patch(verifyToken, update_business);

    //prettier-ignore

// business_route
//     .route("business/:id/certificate")
//     .get(verifyToken, get_certificate)
//     .patch(verifyToken, update_a_business);



export default business_route;
