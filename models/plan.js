import { mongoose } from "mongoose";
import { no_image } from "../utils/consts";

const { Schema } = mongoose;

const planSchema = new Schema({
  business_id: {
    type: String,
    ref: "business",
    required: true,
  },
  user_id: {
    type: String,
    ref: "user",
    required: true,
  },
  status: {
    type: String,
    default: "upcoming",
  },
  result_boolean: {
    type: Boolean,
    default: false,
  },
  result: {
    type: String,
    default: "N/A",
  },
  penalty: {
    type: String,
    default: "N/A",
  },
  shedule: {
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
        default: "N/A",
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
