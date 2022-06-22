import express from 'express';

const router = express.Router();

import auth from '../middleware/auth.js';
import {
    create_workout, get_workouts, get_workout, update_workout
} from '../controllers/workout.js';

// Create
router.post('/', auth, create_workout);

// Read
router.get('/', auth, get_workouts);

router.get('/:id', auth, get_workout);

// Update
router.patch('/:id', auth, update_workout);

// // Delete
// router.delete('/:id', auth, delete_workout);

export default router;