import { mongoose } from "mongoose";
import { no_image } from "../utils/consts.js";

const { Schema } = mongoose;

const planSchema = new Schema({
  business_id: {
    type: String,
    ref: "business",
    required: [true, "Business ID is required"],
  },
  account_id: {
    type: String,
    required: [true, "Account ID is required"],
  },
  status: {
    type: String,
    default: "Đang thực hiện",
  },
  result_comment: {
    type: String,
    default: "N/A",
  },
  result: {
    type: String,
    default: "Chưa có",
  },
  penalty: {
    type: String,
    default: "N/A",
  },
  schedule: {
    start: {
      type: String,
      default: "N/A",
    },
    end: {
      type: String,
      default: "N/A",
    },
  },

  samples: [
    {
      id: {
        type: String,
        required: true,
      },
      image: {
        type: String,
        default: no_image,
      },
      inspector: {
        type: String,
        default: "N/A",
      },
      result: {
        type: String,
        default: "Chưa có kết quả",
      },
      send_at: {
        type: String,
        default: "N/A",
      },
      receive_at: {
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

const Plan = mongoose.model("plan", planSchema);

export default Plan;
