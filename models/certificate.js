import mongoose from "mongoose";

const { Schema } = mongoose;

const certificateSchema = new Schema({
  certificate_id: {
    type: String,
    default: "N/A",
  },
  status: {
    type: String,
    default: "Chưa cấp",
  },
  time: {
    start: {
      type: String,
      default: "N/A",
    },
    end: {
      type: String,
      default: "N/A",
    },
  },
  last_update: {
    type: Date,
    default: new Date(),
  },
});

export default certificateSchema;
