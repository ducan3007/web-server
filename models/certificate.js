import mongoose from "mongoose";

const { Schema } = mongoose;

const certificate = new Schema({

    
});

const CERT = mongoose.model("certificate", certificate);

export default CERT;
