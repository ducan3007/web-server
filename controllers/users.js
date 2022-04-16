import jwt from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import User from "../models/user.js"

export const signUp = async (req, res, next) => {
    try {
        const { username, email, password, confirmPassword } = req.body;
        const user = await User.findOne({email:email});
        if(user){
            return res.status(400).json({message:"Email đã tồn tại",data:null})
        }else if(password != confirmPassword){
            return res.status(400).json({message:"Password không hợp lệ",data:null})
        }else{
            let salt = bcrypt.genSaltSync(10)
            let hashPassword = await bcrypt.hash(password,salt);
            let result = await User.create({username:username, email:email, password:hashPassword});
            let payload = {
                user:{
                    email:result.email,
                    id: result._id
                }
            }
            const token = jwt.sign(payload,process.env.KEY,{expiresIn:"36000"})
            return res.status(200).json({message:'Đăng ký thành công',data:token})
        }
    } catch (error) {
        console.log(error);
    }



}

export const signIn = async (req, res, next) => {
try {
    const {email,password} = req.body;
    const user = await User.findOne({email:email});
    if(!user){
        return res.status(404).json({message:'Người dùng đã tồn tại',data:null})
    }
    // giải mã password
    const checkPassword = await bcrypt.compare(password,user.password);
    if(!checkPassword){
        return res.status(400),json({message:"Sai mat khau",data:null});
    }else{
        let payload = {
            user:{
                email:user.email,
                id: user._id
            }
        }
        const token = jwt.sign(payload,process.env.KEY,{expiresIn:"36000"})
        return res.status(200).json({message:'Đăng nhập thành công',data:token})
    }
    
} catch (error) {
    console.log(error);
}
}   

export const updateUser = (req,res,next) => {
    try {
        // de lay id tu /user:id => req.params.id
    } catch (error) {
        console.log(error);
    }
}

