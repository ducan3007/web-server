import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/user.js";
import response from "../../utils/response.js";
import { create_user_id } from "../../models/user.js";
import { uploadImage } from "../../utils/cloudinary.js";

export const update_user = async (req, res, next) => {
  try {
    // Update user thong qua user.id

    const user = req.body;
    
    if (user.image) {
      let image_load = await uploadImage(user.image);
      console.log("image_url: ", image_load.url);
      user.image = image_load.url;
    }

    const _update_user = await User.findOneAndUpdate({ id: user.id }, user, { overwrite: false });

    res.status(200).json(response("update_user", _update_user));
  } catch (error) {
    console.log(error);
  }
};

export const get_user_detail = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
/*
  Truy vẫn lọc người dùng thông qua body của request:  districts:[mã quận]

  
*/
export const get_many_user = async (req, res, next) => {
  try {
    // kiểm tra req.body

    const _filter = req.body;
    const _query = req.query;
    const _params = req.params;

    if (_districts) {
      // lấy dữ liệu theo bộ lọc _filter
    }

    if (!req.body && !req.params) {
      const user_list = await User.find();

      res.status(200).json(response("get many user", user_list));
    }
    res.status(200).json(response("get many user", null));
  } catch (error) {
    console.log(error);
  }
};

export const delete_user = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
