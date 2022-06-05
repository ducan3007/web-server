import express from "express";

import { verifyToken, verifyRole, verifyRequest, verifyWorkArea } from "../middlewares/verify.js";
import {
  get_many_business,
  get_business,
  add_business,
  update_business,
  create_business,
} from "../controllers/business/business.controller.js";

import { revokeCertificate, issueCertificate, extendCertificate } from "../controllers/business/cert.controller.js";


const business_route = express.Router();

// business_route.route("/business/create").post(verifyToken, verifyRequest, verifyWorkArea, create_business);

business_route
  .route("/business")
  .get(verifyToken, verifyRequest, get_many_business)
  .post(verifyToken, verifyRequest, verifyWorkArea, create_business);

business_route
  .route("/certificate/:id")
  .post(verifyToken, verifyRequest, issueCertificate)
  .delete(verifyToken, verifyRequest, revokeCertificate)
  .patch(verifyToken, verifyRequest, extendCertificate);
// .put(verifyToken, verifyRequest, certificate)
// .delete(verifyToken, verifyRequest, certificate);
/*

  api này dành cho các cơ sở kinh doanh

  @GET: lấy tất cả các cơ sở kinh doanh
  

*/

business_route.route("/business/:id").get(verifyToken, get_business).patch(verifyToken, verifyRequest, update_business);

//prettier-ignore

// business_route
//     .route("business/:id/certificate")
//     .get(verifyToken, get_certificate)
//     .patch(verifyToken, update_a_business);

export default business_route;
