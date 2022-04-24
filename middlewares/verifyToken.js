import jwt from "jsonwebtoken";
import response from "../utils/response.js";
import "dotenv/config";

export const verifyToken = async(req, res, next) => {
    const token = req.header("x-auth-token");
    try {
        if (!token) {
            return res.status(401).json(response("Xin mời đăng nhập", null));
        }
        jwt.verify(token, process.env.KEY, (error, data) => {
            if (error) {
                return res.status(400).json(response( "Xin mời đăng nhập", null));
            }

            req.user = data.user;
            next();
        });
    } catch (error) {
        console.log(error);
        return res.status(400).json(response("Thông tin đăng nhập không chính xác", null));
    }
};