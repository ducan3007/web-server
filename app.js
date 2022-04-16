import express from "express";
import mongoose from "mongoose";
import morgan from "morgan";
import cors from "cors";
import 'dotenv/config'

const app = express();

app.use(express.json({ limit: '5mb', extended: true }));
app.use(express.urlencoded({ limit: '5mb', extended: true }));
app.use(cors());
app.use(morgan("dev"));

mongoose.connect(process.env.DB, { useNewUrlParser: true, useUnifiedTopology: true }, (error) => {
    if (error) {
        throw error;
    }
    console.log("MongoDb connected!");
});


app.listen(process.env.PORT || 5000, () => {
    console.log(`Server started on port ${process.env.PORT}`);
})
