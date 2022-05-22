import mongoose from "mongoose";
import { gen_user_id } from "../utils/helpers.js";
const { Schema } = mongoose;

const userSchema = new Schema({
  id: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  fullname: {
    type: String,
    default: "N/A",
  },
  active: {
    type: String,
    default: "Hoạt động",
  },
  email: {
    type: String,
    default: "N/A",
  },
  phone: {
    type: String,
    default: "N/A",
  },
  birth: {
    type: Date,
  },
  image: {
    type: String,
    default: "https://secure.gravatar.com/avatar/?s=120&d=mp",
  },
  work_area: [
    {
      city: {
        type: String,
        default: "N/A",
      },
      title: {
        type: String,
        default: "N/A",
      },
      code: {
        type: String,
        default: "N/A",
      },
      _id: false,
    },
  ],
  role: {
    type: String,
    default: "user",
  },
  created_at: {
    type: Date,
    default: new Date(),
  },
});

const User = mongoose.model("user", userSchema);

export const create_user_id = async (role) => {
  try {
    let user_id = gen_user_id(role);
    let check = false;
    while (!check) {
      let user = await User.findOne({ id: user_id });
      if (user) {
        user_id = gen_user_id(role);
      } else {
        check = true;
      }
    }
    return user_id;
  } catch (error) {
    console.log(error);
  }
};

export default User;
