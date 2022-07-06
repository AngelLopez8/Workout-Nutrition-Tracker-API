import mongoose from 'mongoose';

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    bodyArea : {
        type: String,
        required: true,
        trim: true
    },
    sets: {
        type: Number,
        required: true
    },
    reps: {
        type: String,
        default: "Failure"
    },
    time: {
        type: Number,
        default: 0.0,
        validate(value) {
            if (value < 0) {
                throw new Error('Time must be a positive number in seconds');
            }
        }
    }
}, {
    timestamps: true
});

export default ExerciseSchema;