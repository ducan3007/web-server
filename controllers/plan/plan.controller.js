import Plan from "../../models/plan.js";
import Business from "../../models/business.js";
import response from "../../utils/response.js";

export const get_plans = async (req, res, next) => {
  try {
    let __results;
    let options = [
      req.user.role !== "admin" ? { $match: { account_id: req.user.id } } : null,
      {
        $lookup: {
          from: "businesses",
          localField: "business_id",
          foreignField: "business_id",
          as: "business",
        },
      },
      { $unwind: "$business" },
    ].filter((item) => item);

    // console.log(options);

    __results = await Plan.aggregate(options);
    console.log(__results);
    return res.status(200).json(response("get plans", __results));
  } catch (error) {
    console.log(error);
    res.status(400).json(response("Error Get Plans", error));
  }
};
export const get_plan_detail = async (req, res, next) => {
  try {
    let plan = await Plan.findOne({ id: req.params.id }, { password: 0 });
    res.status(200).json(plan);
  } catch (error) {
    res.status(400).json(response("Error Get Plan", error));
  }
};

export const create_plan = async (req, res, next) => {
  try {
    let business = await Business.findOne({});
    let plan = new Plan({
      ...req.body,
      business_id: business.business_id,
      account_id: req.user.id,
      certificate: {
        ...business.certificate,
        certificate_id: business.certificate.certificate_id,
      },
    });
    await plan.save();
    res.status(200).json(response("Success", plan));
  } catch (error) {
    console.log(error.message);
    res.status(400).json(response("Error Create Plan", error.message));
  }
};
export const update_plan = async (req, res, next) => {
  try {
    let plan = await Plan.findOneAndUpdate({ id: req.params.id }, req.body, { overwrite: false, new: true });
    res.status(200).json(plan);
  } catch (error) {
    res.status(400).json(response("Error Update Plan", error));
  }
};
