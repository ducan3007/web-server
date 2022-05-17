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
  types: [
    {
      title: {
        type: String,
        default: "Dịch vụ",
      },
    },
  ],
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
    default: "N/A",
  },
  ward: {
    type: String,
    default: true,
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
    birth: {
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

  certificate: certificateSchema,

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

// {
//   business_id: "20123456",
//   brandname: "Bún 11",
//   type: "Dịch vụ",
//   image: "https://res.cloudinary.com/dtzindhuc/image/upload/v1650799247/no_images_sc1t5e.png",
//   address_code: "",
//   address: "Đường 70",
//   ward: "Phường Tây Mỗ",
//   district: "Quận Nam Từ Liêm",
//   city: "Thành phố Hà Nội",
//   owner: {
//     name: "Nguyen Van A",
//     birth: "19/02/2000",
//     cmnd: "123456789",
//   },
//   phone: "0987654321",
//   certificate: {
//     certificate_id: "2022234623",
//     status: "Còn hạn",
//     time: {
//       start: "20/02/2020",
//       end: "26/02/2020",
//     },
//   },
//   foods: [
//     {
//       image: "https://res.cloudinary.com/dtzindhuc/image/upload/v1650799247/no_images_sc1t5e.png",
//       name: "Cơm rang",
//       status: "Đạt an toàn vệ sinh",
//     },
//     {
//       image: "https://res.cloudinary.com/dtzindhuc/image/upload/v1650799247/no_images_sc1t5e.png",
//       name: "Bún",
//       status: "Đạt an toàn vệ sinh",
//     },
//   ],
//   last_update: "20/02/2020",
// },

const Business = mongoose.model("business", businessSchema);

export const bus_findById = async (business_id) => {
  return Business.findOne({ business_id: business_id });
};

export const bus_create_id = async (city_code, district_code) => {};

export default Business;
