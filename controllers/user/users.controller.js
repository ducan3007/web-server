import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/user.js";
import response from "../../utils/response.js";
import { create_user_id } from "../../models/user.js";
import { uploadImage } from "../../utils/cloudinary.js";

export const update_user = async (req, res, next) => {
  try {
    if (req.user.id !== req.params.id && req.user.role !== "admin")
      return res.status(403).json(response("Bạn không có quyền", null));

    if (req.user.role === "user" && req.body.work_area) {
      return res.status(403).json(response("Bạn không có quyền cập nhật work_area", null));
    }

    let user = await User.findOne({ id: req.params.id }, { password: 0 });
    if (!user) return res.status(404).json(response("Không tìm thấy User!", null));

    if (req.body.isNewImage) {
      let newIamge = await uploadImage(req.body.image);
      req.body.image = newIamge.url;
    }

    if (req.body.isNewPassword) {
      if (req.body.password !== req.body.confirmPassword)
        return res.status(400).json(response("Mật khẩu không khớp", null));

      let salt = bcrypt.genSaltSync(10);
      let hashPassword = await bcrypt.hash(req.body.password, salt);
      req.body.password = hashPassword;
    }
    let update = await User.findOneAndUpdate({ id: req.params.id }, req.body, { overwrite: false, new: true });
    res.status(200).json(response("Cập nhật thông tin thành công!", update));
  } catch (error) {
    res.status(400).json(response("Error Update User", error));
    console.log(error);
  }
};

export const add_work_area = async (req, res, next) => {
  try {
    if (req.user.role !== "admin") return res.status(403).json(response("Bạn không có quyền", null));

    let user = await User.findOne({ id: req.params.id }, { password: 0 });

    if (!user) return res.status(404).json(response("Không tìm thấy User!", null));

    console.log(req.body.work_area);

    let update = await User.findOneAndUpdate(
      { id: req.params.id },
      { $addToSet: { work_area: { $each: req.body.work_area } } },
      { overwrite: false, new: true }
    );
    return res.status(200).json(response("Thêm khu vực thành công!", update));
  } catch (error) {
    return res.status(400).json(response("Error Add Workarea", error));
  }
};

export const get_user_detail = async (req, res, next) => {
  try {
    const user = await User.findOne({ id: req.params.id }, { password: 0 });

    if (!user) return res.status(404).json(response("Không tìm thấy user", null));

    if (req.user.role === "admin" || req.user.id === req.params.id)
      return res.status(200).json(response("get_user_detail", user));

    return res.status(403).json(response("Bạn không có quyền", null));
  } catch (error) {
    return res.status(400).json(response(error, null));
  }
};

export const get_many_user = async (req, res, next) => {
  try {
    let __results;
    let query = req.query;
    console.log("query", query);

    if (req.query.search === undefined || Object.keys(JSON.parse(req.query.search)).length === 0) {
      __results = await User.find({ role: "user" });
      return res.status(200).json(response("get many user", __results));
    }

    const { textSearch, city, districts, active } = JSON.parse(req.query.search);

    let districtOptions = districts.map((district) => ({ "work_area.title": `${district}` }));
    let cityOptions = city ? { "work_area.city": `${city}` } : {};
    let activeOptions = active ? { active: active } : {};
    let options =
      districts.length === 0
        ? { $and: [cityOptions, activeOptions, { role: "user" }] }
        : { $or: [...districtOptions], ...activeOptions, role: "user" };

    console.log("options: ", options);

    if (textSearch) {
      __results = await User.aggregate([
        { $search: { index: "user_text_search", text: { query: `${textSearch}`, path: { wildcard: "*" } } } },
        { $match: options },
      ]);
      return res.status(200).json(response("get many user", __results));
    }

    __results = await User.find(options, { password: 0 });
    return res.status(200).json(response("get many user without text search", __results));
  } catch (error) {
    return res.status(400).json(response(`${error}`, null));
  }
};

export const delete_user = async (req, res, next) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
