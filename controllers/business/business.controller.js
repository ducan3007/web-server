import Business from "../../models/business.js";
import response from "../../utils/response.js";

import { gen_business_id } from "../../utils/helpers.js";




export const get_many_business = async (req, res) => {
    try {
        res.status(200).json(response("get all business", await Business.find()));
    } catch (error) {
        console.log(error);
    }
}

export const get_business = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}

export const create_business = async (req, res) => {
    try {
        const user = req.body;
        var certificate = req.body.createCertificate;
        if(certificate) {
            // Kiem tra id da ton tai hay chua, chua thi tao moi, roi thi bao lai
            let newBusiness = new Business({
            business_id : gen_business_id,
            brandname : user.brandname,
            type : user.type,
            image: user.image,
            address_code: user.address_code,
            address: user.address,
            ward : user.ward,
            district : user.district,
            city : user.city,
            phone : user.phone
            })

            await newBusiness.save();
            return res.status(200).json(response("Tạo cơ sở kinh doanh thành công", newBusiness));
        }


    } catch (error) {
        console.log(error);
    }
}

export const add_business = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}
export const update_business = async (req, res) => {
    try {
        
    } catch (error) {
        console.log(error);
    }
}