import mongoose from "mongoose";

const { Schema } = mongoose;

const certificateSchema = new Schema({
  business_ref: {
    type: Schema.Types.ObjectId,
    ref: "business",
    required: true,
  },
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
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const Certificate = mongoose.model("certificate", certificateSchema);

export default Certificate;
