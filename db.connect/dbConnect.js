import mongoose from "mongoose";

const url = "mongodb://localhost:27017/shop?authSource=admin"
const dbConnect = async () => {
    try {
        const connect = await mongoose.connect(url, {
            auth: {
                username: process.env.MONGO_USER,
                password: process.env.MONGO_PASS
            }
        })
        console.log("Connected")
    } catch (error) {
        console.log(error);
        console.log("Error");
    }
};

export default dbConnect
