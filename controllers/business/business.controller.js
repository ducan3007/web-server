import Business from "../../models/business.js";
import response from "../../utils/response.js";
import { create_business_id, create_cert } from "../../models/business.js";
import { uploadImage } from "../../utils/cloudinary.js";

export const create_business = async (req, res) => {
  try {
    req.body.business_id = await create_business_id();
    if (req.body.isNewCert) req.body.certificate = await create_cert();
    let newBusiness = new Business(req.body);
    await newBusiness.save();
    return res.status(200).json(response("Thêm cơ sở thành công!", newBusiness));
  } catch (error) {
    return res.status(400).json(response(error, null));
  }
};

export const get_many_business = async (req, res) => {
  try {
    let __results;

    let work_area_option =
      req.user.role === "user" ? req.user.work_area.map((item) => ({ district: `${item.title}` })) : [{}];

    console.log(req.user.work_area);
    console.log(
      "🚀 ~ file: business.controller.js ~ line 22 ~ constget_many_business= ~ work_area_option",
      work_area_option
    );

    if (req.query.search === undefined || Object.keys(JSON.parse(req.query.search)).length === 0) {
      __results = await Business.find({ $or: [...work_area_option] });
      return res.status(200).json(response("get many business without search", __results));
    }

    const { textSearch, city, district, ward, type, certStatus } = JSON.parse(req.query.search);

    console.log({
      textSearch,
      city,
      district,
      ward,
      type,
      certStatus,
    });

    let cityOption = city ? { city: city } : {};
    let districtsOption = district ? { district: district } : {};
    let wardOption = ward ? { ward: ward } : {};
    let typeOption = type ? { "types.title": type } : {};
    let certStatusOption = certStatus ? { "certificate.status": `${certStatus}` } : {};
    let options = { $and: [cityOption, districtsOption, wardOption, typeOption, certStatusOption] };

    if (textSearch) {
      __results = await Business.aggregate([
        { $search: { index: "business_text_search", text: { query: textSearch, path: { wildcard: "*" } } } },
        { $match: options },
      ]);
    } else {
      __results = await Business.find(options);
    }
    return res.status(200).json(response("get many business", __results));
  } catch (error) {
    return res.status(400).json(error, null);
  }
};

export const get_business = async (req, res) => {
  try {
    let __results = await Business.findOne({ business_id: req.params.id });
    if (!__results) return res.status(404).json(response("Không tìm thấy cơ sở", null));

    if (req.user.role === "user" && !req.user.work_area.find((item) => item.title === __results.district)) {
      return res.status(403).json(response("Bạn không có quyền xem thông tin cơ sở này", null));
    }

    return res.status(200).json(response("get business", __results));
  } catch (error) {
    console.log(error);
  }
};

export const add_business = async (req, res) => {
  try {
    if (!req.user.work_area.find((item) => item.title === req.body.district)) {
      return res.status(403).json(response("Bạn không có quyền thêm cơ sở này", null));
    }

    let __results = await Business.findOne({ business_id: req.params.id });
    if (__results) return res.status(400).json(response("Cơ sở đã tồn tại", null));

    req.body.business_id = req.params.id;
  } catch (error) {
    console.log(error);
  }
};
export const update_business = async (req, res) => {
  try {
    let __business = await Business.findOne({ business_id: req.params.id });

    if (!__business) return res.status(404).json(response("Không tìm thấy cơ sở", null));

    if (req.user.role === "user" && !req.user.work_area.find((item) => item.title === __business.district)) {
      return res.status(403).json(response("Bạn không có quyền sửa thông tin cơ sở này", null));
    }

    if (req.body.isNewImage) {
      let newIamge = await uploadImage(req.body.image);
      req.body.image = newIamge.url;
    }

    __business = await Business.findOneAndUpdate({ business_id: req.params.id }, req.body, {
      overwrite: false,
      new: true,
    });

    return res.status(200).json(response("Cập nhật thông tin thành công!", __business));
  } catch (error) {
    console.log(error);
    return res.status(400).json(response(error?.message, null));
  }
};
