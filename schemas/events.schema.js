import mongoose from "mongoose";

const Events = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    date: Date,
    description: String,
    ticket: Number,
    user: {
        type: mongoose.ObjectId,
        ref: "User",
    },
}, {
    timestamps: true
});

const EventModel = mongoose.model('events', Events);

export default EventModel;
