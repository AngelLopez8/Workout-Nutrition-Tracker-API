import express from 'express';

const router = express.Router();

import auth from '../middleware/auth.js';
import {
    create_exercise, get_exercises, get_exercise, update_exercise
} from '../controllers/exercise.js';

// Create
router.post('/', auth, create_exercise);

// Read
router.get('/', auth, get_exercises);

router.get('/:id', auth, get_exercise);

// Update
router.patch('/:id', auth, update_exercise);

// Delete
// router.delete('/:id', auth, delete_exercise);

export default router;