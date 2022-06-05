import jwt from "jsonwebtoken";
import response from "../utils/response.js";
import "dotenv/config";
import Business from "../models/business.js";

export const verifyRequest = (req, res, next) => {
 
  Object.keys(req.body).forEach((key) => {
    if (req.body[key] === "" || req.body[key] === undefined) {
      delete req.body[key];
    }
  });
  let searchParams = {};
  if (req.query.search) {
    searchParams = JSON.parse(req.query.search);
    Object.keys(searchParams).forEach((key) => {
      if (searchParams[key] === "" || searchParams[key] === undefined) {
        delete searchParams[key];
      }
    });
    req.query.search = JSON.stringify(searchParams);
  }

  console.log("VERIFIED REQUEST : ", req.query);
  return next();
};

export const verifyToken = async (req, res, next) => {
  const token = req.header("x-auth-token");

  try {
    if (!token) {
      return res.status(400).json(response("Thông tin đăng nhập không chính xác", null));
    }
    jwt.verify(token, process.env.KEY, (error, data) => {
      if (error) {
        return res.status(400).json(response("Thông tin đăng nhập không chính xác", null));
      }
      req.user = data.user;
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json(response("Thông tin đăng nhập không chính xác", null));
  }
};

export const verifyRole = async (req, res, next) => {
  const token = req.header("x-auth-token");
  try {
    if (!token) {
      return res.status(403).json(response("Bạn không có quyền", null));
    }
    jwt.verify(token, process.env.KEY, (error, data) => {
      if (error || data.user.role !== "admin") {
        return res.status(403).json(response("Bạn không có quyền", null));
      }
      req.user = data.user;
      return next();
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json(response("Bạn không có quyền", null));
  }
};
export const verifyWorkArea = async (req, res, next) => {
  try {
    if (req.user.role === "admin") {
      return next();
    }

    if (!req.body.city || !req.body.district || !req.body.ward)
      return res.status(400).json(response("Yêu cầu nhập đủ thông tin", null));

    for (let area of req.user.work_area) {
      console.log("AREA: ", area);
      console.log("DISTRICT: ", req.body.district);
      if (area.title === req.body.district) {
        return next();
      }
    }
    return res.status(403).json(response("Bạn không có quyền", null));
  } catch (error) {
    return res.status(403).json(response(error, null));
  }
};
