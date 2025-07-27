const mongoose= require("mongoose");
    
const connectDB = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, {
    
        });
        console.log("MongoDB connected successfully");
    } catch (error) {
        console.error("MongoDB connection failed:", error.message);
        process.exit(1); // Exit the process with failure
    }
};

module.exports = connectDB;
  