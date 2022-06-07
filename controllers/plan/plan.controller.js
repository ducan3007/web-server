import Plan from "../../models/plan.js";
import Business from "../../models/business.js";
import response from "../../utils/response.js";
import mongoose from "mongoose";
import { uploadImage } from "../../utils/cloudinary.js";

export const get_plans = async (req, res, next) => {
  try {
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
    let __results = await Plan.aggregate(options);
    return res.status(200).json(response("get plans", __results));
  } catch (error) {
    console.log(error);
    res.status(400).json(response("Error Get Plans", error));
  }
};
export const get_plan_detail = async (req, res, next) => {
  try {
    let plan = await Plan.aggregate([
      { $match: { _id: mongoose.Types.ObjectId(req.params.id) } },
      {
        $lookup: {
          from: "businesses",
          localField: "business_id",
          foreignField: "business_id",
          as: "business",
        },
      },
    ]);

    res.status(200).json(response("get plan detail", plan[0]));
  } catch (error) {
    res.status(400).json(response("Error Get Plan", error));
  }
};

export const create_plan = async (req, res, next) => {
  try {
    let business = await Business.findOne({ business_id: req.body.business_id });

    if (!business) return res.status(400).json(response("Business not found", null));

    let plan = new Plan({
      business_id: req.body.business_id,
      account_id: req.user.id,
      schedule: req.body.schedule,
    });
    let date = new Date();
    let __results = await Promise.all([
      await plan.save(),
      await Business.updateOne(
        {
          business_id: req.body.business_id,
        },
        {
          $set: { last_check: date.toISOString() },
        }
      ),
      await Plan.aggregate([
        { $match: { _id: plan._id } },
        {
          $lookup: {
            from: "businesses",
            localField: "business_id",
            foreignField: "business_id",
            as: "business",
          },
        },
        { $unwind: "$business" },
      ]),
    ]);
    console.log(__results);
    res.status(200).json(response("Success", __results[2][0]));
  } catch (error) {
    console.log(error.message);
    res.status(400).json(response("Error Create Plan", error.message));
  }
};
export const update_plan = async (req, res, next) => {
  try {
    let plan = await Plan.findOneAndUpdate({ _id: req.params.id }, req.body, { overwrite: false, new: true });
    console.log("NEW PLAN", plan);
    let new_plan = await Plan.aggregate([
      { $match: { _id: plan._id } },
      {
        $lookup: {
          from: "businesses",
          localField: "business_id",
          foreignField: "business_id",
          as: "business",
        },
      },
      { $unwind: "$business" },
    ]);
    res.status(200).json(response("Cập nhật kế hoạch thành công", new_plan[0]));
  } catch (error) {
    res.status(400).json(response("Error Update Plan", error));
  }
};

export const add_samples = async (req, res, next) => {
  try {
    let plan = await Plan.findOne({ _id: req.params.id });
    if (!plan) return res.status(400).json(response("Plan not found", null));
    let samples = req.body;

    let newIamge = await uploadImage(req.body.image);
    samples.image = newIamge.url;

    await Plan.updateOne({ _id: plan._id }, { $push: { samples: samples } }, { overwrite: false, new: true });
    let new_plan = await Plan.aggregate([
      { $match: { _id: plan._id } },
      {
        $lookup: {
          from: "businesses",
          localField: "business_id",
          foreignField: "business_id",
          as: "business",
        },
      },
      { $unwind: "$business" },
    ]);
    res.status(200).json(response("Thêm mẫu thành công", new_plan[0]));
  } catch (error) {
    console.log(error);
    res.status(400).json(response("Error Add Samples", error));
  }
};
export const update_samples = async (req, res, next) => {
  try {
    let plan = await Plan.findOne({ _id: req.params.id });
    if (!plan) return res.status(400).json(response("Plan not found", null));

    let updated_plan = await Plan.updateOne(
      { _id: plan._id, "samples._id": req.body._id },
      {
        $set: {
          "samples.$.inspector": req.body.inspector,
          "samples.$.id": req.body.id,
          "samples.$.result": req.body.result,
          "samples.$.send_at": req.body.send_at,
          "samples.$.receive": req.body.receive,
        },
      },
      { overwrite: false, new: true }
    );
    let new_plan = await Plan.aggregate([
      { $match: { _id: plan._id } },
      {
        $lookup: {
          from: "businesses",
          localField: "business_id",
          foreignField: "business_id",
          as: "business",
        },
      },
      { $unwind: "$business" },
    ]);
    res.status(200).json(response("Cập nhật mẫu thành công", new_plan[0]));
  } catch (error) {
    console.log(error);
    res.status(400).json(response("Error Update Samples", error));
  }
};
