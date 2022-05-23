import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import User from "../../models/user.js";
import response from "../../utils/response.js";
import { create_user_id } from "../../models/user.js";


export const create_admin_account = async (req, res) => {
  let { key } = req.params;
  if (key !== process.env.KEY) {
    return res.status(403).json(response("Bạn không có quyền", null));
  }
  try {
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = await bcrypt.hash("123456", salt);
    let user_id = await create_user_id("admin");
    let newUser = new User({
      id: user_id,
      password: hashPassword,
      fullname: "Admin",
      birth: "N/A",
      image: "https://secure.gravatar.com/avatar/?s=120&d=mp",
      role: "admin",
    });
    await newUser.save();
    return res.status(200).json(response("Tạo tài khoản Admin thành công", newUser));
  } catch (error) {
    console.log(error);
  }
};

export const create_account = async (req, res) => {
  try {
    let { role, fullname, work_area } = req.body;
    let salt = bcrypt.genSaltSync(10);
    let hashPassword = await bcrypt.hash("123456", salt);
    let user_id = await create_user_id("user");
    let newUser = new User({
      id: user_id,
      password: hashPassword,
      fullname: fullname,
      birth: "N/A",
      image: "https://secure.gravatar.com/avatar/?s=120&d=mp",
      work_area: work_area,
      role: "user",
    });
    await newUser.save();
    return res.status(200).json(response("Tạo tài khoản User thành công", newUser));
  } catch (error) {
    console.log(error);
  }
};

export const login = async (req, res, next) => {
  try {
    console.log("try to login");
    const { account, password } = req.body;
    const user = await User.findOne({ id: account });
    if (!user) {
      return res.status(404).json(response("Tài khoản và mật khẩu không đúng", null));
    }
    // giải mã password
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res.status(400).json(response("Tài khoản và mật khẩu không đúng", null));
    } else {

      let payload = {
        user: {
          id: user.id,
          role: user.role,
        },
      };

      const token = jwt.sign(payload, process.env.KEY, { expiresIn: "7200000" });

      return res.status(200).json(response("Đăng nhập thành công", { token }));
    }
  } catch (error) {
    console.log(error);
    return res.status(200).json(response("Tài khoản và mật khẩu không đúng", { token }));
  }
};

export const user_auth = async (req, res) => {
  try {
    const id = req.user.id;
    const user = await User.findOne({ id: id }, { password: 0 });
    return res.status(200).json(response("Xác thực thành công", user));
  } catch (error) {
    console.log(error);
  }
};


  //them phan doi mk cho user

export const change_user_password = async(req, res) => {
  try {
      console.log("try to changepassword");
      const { oldPass, newPass } = req.body;
      const idUser = req.user.id;
      let salt = bcrypt.genSaltSync(10);
      let newPassword = await bcrypt.hash(newPass, salt);
      const user = await User.findOne({ id: idUser });
      const checkPassword = await bcrypt.compare(oldPass, user.password);
      if (!checkPassword) {
        return res.status(400).json(response("Tài khoản và mật khẩu không đúng"));
      } else {
        await User.findOneAndUpdate({id:idUser},{password:newPassword});
        return res.status(200).json(response("Doi mat khau thành công"));
      }
      
  } catch (error) {
    console.log(error);
  }
};


//log out
export const log_out = async(req, res) => {
  try {
    const {isLogout} = req.body;
    console.log(isLogout);
    if(isLogout) {
      let payload = {};
      const token = jwt.sign(payload,process.env.KEY, { expiresIn: "0" });
      return res.status(200).json(response("Đăng xuất thành công"));
    }
  } catch (error) {
    console.log(error);
  }
}