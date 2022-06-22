import mongoose from 'mongoose';
import WorkoutSchema from './Workout.schema.js';

const ScheduleSchema = new mongoose.Schema({
    numberOfDays: {
        type: Number,
        default: 0
    },
    numberOfWorkoutsPerDay: {
        type: Number,
        default: 0
    },
    workouts: [WorkoutSchema]
}, {
    timestamps: true
});

export default ScheduleSchema;