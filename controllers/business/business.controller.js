import Business from "../../models/business.js";
import response from "../../utils/response.js";
import { create_business_id, create_cert } from "../../models/business.js";

export const create_business = async (req, res) => {
  try {
    console.log(req.body);

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
    let query = req.query;
    console.log("query", query);
    if (req.query.search === undefined || Object.keys(JSON.parse(req.query.search)).length === 0) {
      __results = await Business.find({});
      return res.status(200).json(response("get many business", __results));
    }

    const { textSearch, city, districts, ward, type, certStatus } = JSON.parse(req.query.search);

    let cityOption = city ? { city: city } : {};
    let districtsOption = districts ? { districts: districts } : {};
    let wardOption = ward ? { ward: ward } : {};
    let typeOption = type ? { "types.title": type } : {};
    let certStatusOption = certStatus ? { "certificate.status": certStatus } : {};
    let options = { $and: [cityOption, districtsOption, wardOption, typeOption, certStatusOption] };

    __results = await Business.find(options);
    return res.status(200).json(response("get many business", __results));
  } catch (error) {
    console.log(error);
  }
};

export const get_business = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};

export const add_business = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
export const update_business = async (req, res) => {
  try {
  } catch (error) {
    console.log(error);
  }
};
