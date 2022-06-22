import mongoose from "mongoose";
import ExerciseSchema from "./Exercise.schema.js";
import WorkoutSchema from "./Workout.schema.js";
import ScheduleSchema from "./Schedule.schema.js";
import ProgressSchema from "./Progress.schema.js";

export const Exercise = mongoose.model('Exercise', ExerciseSchema);
export const Workout = mongoose.model('Workout', WorkoutSchema);
export const Schedule = mongoose.model('Schedule', ScheduleSchema);
export const Progress = mongoose.model('Progress', ProgressSchema);
