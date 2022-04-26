import mongoose from "mongoose";

const { Schema } = mongoose;

const certificateSchema = new Schema({
  certificate_id: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    default: "N/A",
  },
  duration: {
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
