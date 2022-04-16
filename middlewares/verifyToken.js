// middleware xac thuc token

// ô làm cài này nhé

export const verifyToken = (req,res,next) => {
    try {
        

        // goi req.header de lay token va kiem tra
        // gọi next() nếu token hợp le, 
        // net khong thi res.status(400).json({message:"token ko hop le",data:null})
        
    } catch (error) {
        console.log(error);
    }
}