import mongoose from "mongoose";

export const connectDB = async (req, res) => {
    //mongo server url
    const url = "";

    const {connection} = await mongoose.connect(url);

    console.log(`MongoDB Connection successful to ${connection.host}`);

}