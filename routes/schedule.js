import express from 'express';

const router = express.Router();

import auth from '../middleware/auth.js';
import {
    create_schedule, get_schedules, get_schedule, update_schedule
} from '../controllers/schedule.js';

// Create
router.post('/', auth, create_schedule);

// Read
router.get('/', auth, get_schedules);

router.get('/:id', auth, get_schedule);

// Update
router.patch('/:id', auth, update_schedule);

// Delete
// router.delete('/:id', auth, delete_schedule);

export default router;