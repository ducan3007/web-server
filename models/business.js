import mongoose from "mongoose";
import { no_image } from "../utils/consts.js";
const { Schema } = mongoose;
import certificateSchema from "./certificate.js";


const businessSchema = new Schema({
  business_id: {
    type: String,
    required: true,
  },
  brandname: {
    type: String,
    required: true,
  },
  // loại hình : ăn uống - sản xuất
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: no_image,
  },
  address_code: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  owner: {
    name: {
      type: String,
      default: "N/A",
    },
    birh: {
      type: String,
      default: "N/A",
    },
    cmnd: {
      type: String,
      default: "N/A",
    },
  },
  phone: {
    type: String,
    required: true,
  },

  certificate:  certificateSchema ,

  foods: [
    {
      image: {
        type: String,
        default: no_image,
      },
      name: {
        type: String,
        default: "N/A",
      },
      status: {
        type: String,
        default: "N/A",
      },
    },
  ],
  last_update: {
    type: Date,
    default: new Date(),
  },
});

const Business = mongoose.model("business", businessSchema);

export const bus_findById = async (business_id) => {
  return Business.findOne({ business_id: business_id });
};

export const bus_create_id = async (city_code, district_code) => {
  var bus_id = city_code + Date.toString;
  return bus_id;
};


export default Business;
