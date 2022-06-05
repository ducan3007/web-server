import Business from "../../models/business.js";
import response from "../../utils/response.js";
import { create_cert } from "./../../models/business.js";

export const revokeCertificate = async (req, res) => {
  try {
    let business = await Business.findOne({ business_id: req.params.id });
    if (!business) return res.status(404).json(response("Không tìm thấy cơ sở", null));
    if (business.certificate.status === "Thu hồi") {
      return res.status(400).json(response("Cơ sơ này không có chứng nhận", null));
    }
    business = await Business.findOneAndUpdate(
      { business_id: req.params.id },
      { $set: { "certificate.status": "Thu hồi" } },
      { new: true }
    );
    return res.status(200).json(response("Thu hồi chứng nhận thành công", business));
  } catch (error) {
    return res.status(400).json(response(error, null));
  }
};
export const issueCertificate = async (req, res) => {
  try {
    let business = await Business.findOne({ business_id: req.params.id });
    if (!business) return res.status(404).json(response("Không tìm thấy cơ sở", null));
    if (business.certificate.status === "Còn hạn")
      return res.status(400).json(response("Chứng nhận đã được cấp trước đó", null));

    let newCertificate = await create_cert();
    business = await Business.findOneAndUpdate(
      { business_id: req.params.id },
      { $set: { certificate: newCertificate } },
      { new: true }
    );
    return res.status(200).json(response("Xác nhận cấp chứng nhận thành công", business));
  } catch (error) {
    return res.status(400).json(response(error, null));
  }
};
export const extendCertificate = async (req, res) => {
  try {
    let business = await Business.findOne({ business_id: req.params.id });
    if (!business) return res.status(404).json(response("Không tìm thấy cơ sở", null));
    if (business.certificate.status === "Còn hạn")
      return res.status(400).json(response("Chứng nhận vẫn còn hạn", null));

    let start = new Date();
    let end = new Date();
    end.setDate(start.getDate() + 180);

    let newCertificate = {
      certificate_id: business.certificate.certificate_id,
      status: "Còn hạn",
      time: {
        start: start,
        end: end,
      },
    };
    business = await Business.findOneAndUpdate(
      { business_id: req.params.id },
      { $set: { certificate: newCertificate } },
      { new: true }
    );
    return res.status(200).json(response("Gia hạn chứng nhận thành công", business));
  } catch (error) {
    console.log(error);
    return res.status(400).json(response("Lỗi cập nhật chứng nhận", null));
  }
};
