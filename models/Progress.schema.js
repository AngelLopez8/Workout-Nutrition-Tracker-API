import mongoose from "mongoose";
import ScheduleSchema from "./Schedule.schema.js";

const ProgressSchema = mongoose.Schema({
    startDate: {
        type: Date,
        default: null
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
    schedule: ScheduleSchema,
    workoutsDone: [{
        type: Boolean
    }],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
}, {
    timestamps: true
});

export default ProgressSchema;