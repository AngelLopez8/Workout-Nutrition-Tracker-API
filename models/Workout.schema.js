import mongoose from 'mongoose';
import ExerciseSchema from './Exercise.schema.js';

const WorkoutSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    description: {
        type: String,
        required: true,
        trim: true
    },
    dayOfTheWeek: {
        type: String,
        required: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    exercises: [ExerciseSchema]
}, {
    timestamps: true
});

export default WorkoutSchema;