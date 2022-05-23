import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/user.js";
import response from "../../utils/response.js";
import { create_user_id } from "../../models/user.js";
import { uploadImage } from "../../utils/cloudinary.js";
import Business from "../../models/business.js";

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


//Lay thong tin role theo id
export const get_user_detail = async (req, res, next) => {
  try {
    let _filter = req.query;
    console.log(_filter);
    let resault = await User.findOne(_filter);
    if(resault == null) {
      return res.status(404).json(response('Không tìm được người dùng theo id', _filter));
    }
    else {
      return res.status(200).json(response('Thông tin người dùng theo id', resault));
    }
  } catch (error) {
    console.log(error);
  }
};

//Lay danh sach nguoi dung theo bo loc
export const get_many_user = async(req, res, next) => {
  try {
    let _filter = req.body;
    let list_user = await User.find(_filter);
    if(list_user != null) {
      return res.status(200).json(response("lấy danh sách thành công", list_user));
    }
    else {
      return res.status(404).json(response("Không tìm thấy danh sách theo bộ lọc"));
    }
  } catch (error) {
    console.log(error);
  }
}


//Xóa người dùng theo id, chi admin moi duoc quyen xoa
export const delete_user = async (req, res, next) => {
  try {
    let _filter = req.query;
    let user = await User.find(_filter);
    console.log(_filter);
    console.log(user);
    if(user.length != 0) {
      await User.findOneAndDelete({ _filter })
      return res.status(200).json(response("đã xóa người dùng", user));
    }
    else {
      return res.status(404).json(response("Không tìm thấy danh sách theo bộ lọc"));
    }
    
  } catch (error) {
    console.log(error);
  }
};


