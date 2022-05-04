import jwt from "jsonwebtoken";
import response from "../utils/response.js";
import "dotenv/config";

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
      next();
    });
  } catch (error) {
    console.log(error);
    return res.status(403).json(response("Bạn không có quyền", null));
  }
};
