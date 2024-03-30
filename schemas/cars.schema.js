import mongoose from "mongoose";

const Cars = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    price: { type: Number, required: true },
    currency: { type: String, required: true },
    date: Date,
    user: {
        type: mongoose.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
});
const CarsModel = mongoose.model('cars', Cars);

export default CarsModel;
