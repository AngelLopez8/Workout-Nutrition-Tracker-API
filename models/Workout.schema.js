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
    exercises: [ExerciseSchema]
}, {
    timestamps: true
});

export default WorkoutSchema;