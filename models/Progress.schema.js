import mongoose from "mongoose";

const ProgressSchema = mongoose.Schema({
    startDate: {
        type: Date,
        required: true
    },
    completeDate: {
        type: Date,
        default: null
    },
    weight: {
        type: Number,
        default: 0
    },
    height: {
        type: Number,
        default: 0
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

export default ProgressSchema;