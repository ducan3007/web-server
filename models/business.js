import mongoose from "mongoose";
import { no_image } from "../utils/consts.js";
import { gen_business_id, gen_certificate_id } from "../utils/helpers.js";

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
      _id: false,
    },
  ],
  image: {
    type: String,
    default: no_image,
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
  },
  phone: {
    type: String,
    required: true,
  },

  certificate: {
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
  },
  last_check: {
    type: String,
    default: "N/A",
  },
  last_update: {
    type: Date,
    default: new Date(),
  },
});

businessSchema.index({ business_id: 1 }, { unique: true });
businessSchema.index({ "certificate.certificate_id": 1 });

const Business = mongoose.model("business", businessSchema);

export const bus_findById = async (business_id) => {
  return Business.findOne({ business_id: business_id });
};

export const create_business_id = async () => {
  try {
    let bus_id = gen_business_id();
    while (true) {
      let business = await Business.findOne({ business_id: bus_id });
      if (business) {
        bus_id = gen_business_id();
      } else {
        break;
      }
    }
    return bus_id;
  } catch (error) {
    console.log(error);
  }
};

export const create_cert = async () => {
  try {
    let cert_id = gen_certificate_id();
    while (true) {
      let cert = await Business.findOne({ "certificate.certificate_id": cert_id });
      if (cert) {
        cert_id = gen_business_id();
      } else {
        break;
      }
    }
    let start = new Date();
    let end = new Date();
    end.setDate(start.getDate() + 180);

    return {
      certificate_id: cert_id,
      status: "Còn hạn",
      time: {
        start: start.toISOString(),
        end: end.toISOString(),
      },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Business;
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
