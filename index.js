import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

const app = express();
dotenv.config();

// Import Custom Routes
import UserRoutes from './routes/user.js';
import ProgressRoutes from './routes/progress.js';
import ScheduleRoutes from './routes/schedule.js';
import WorkoutRoutes from './routes/workout.js';
import ExerciseRoutes from './routes/exercise.js';

const PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());

// Use Custom Routes
app.use('/user', UserRoutes);
app.use('/schedule', ScheduleRoutes);
app.use('/progress', ProgressRoutes);
app.use('/workout', WorkoutRoutes);
app.use('/exercise', ExerciseRoutes);

await mongoose.connect(process.env.MONGODB_URL)
    .then( () => {
        app.listen(PORT, () => console.log(`Server Running on PORT: ${PORT}`));
    })
    .catch( error => console.error(`Failed to connect to MongoDB Atlas.`));