import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema({
  account: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  username: {
    type: String,
    required: true,
  },
  birth: {
    type: String,
    default: "N/A",
  },
  avatar: {
    type: String,
    default: "https://secure.gravatar.com/avatar/?s=120&d=mp",
  },
  operation_area: {
    id: {
      type: String,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
  },
  role: {
    type: String,
    default: "staff",
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const USER = mongoose.model("user", userSchema);

export default USER;
