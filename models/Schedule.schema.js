import mongoose from 'mongoose';
import WorkoutSchema from './Workout.schema.js';

const ScheduleSchema = new mongoose.Schema({
    daysOfTheWeek: [{
        type: String
    }],
    workouts: [WorkoutSchema]
}, {
    timestamps: true
});

export default ScheduleSchema;