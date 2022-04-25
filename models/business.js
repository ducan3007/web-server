import mongoose from "mongoose";
import { no_image } from "../utils/consts";
import Business from './business';
const { Schema } = mongoose;

const businessSchema = new Schema({
  business_id: {
    type: String,
    required: true,
  },
  brandname: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  image: {
    type: String,
    default: no_image,
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
  certificate_status: {
    type: String,
    default: "N/A",
  },
  certificate_id: {
    type: String,
    default: "N/A",
  },
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
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const Business = mongoose.model("business", businessSchema);

export const check_business_id = async (business_id) => {
    return Business.findOne({ business_id });
}

export default Business;
