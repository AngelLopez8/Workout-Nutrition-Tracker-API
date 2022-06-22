import express from 'express';

const router = express.Router();

import auth from '../middleware/auth.js';
import {
    create_progress, get_progresss, get_progress, update_progress
} from '../controllers/progress.js';

// Create
router.post('/', auth, create_progress);

// Read
router.get('/', auth, get_progresss);

router.get('/:id', auth, get_progress);

// Update
router.patch('/:id', auth, update_progress);

// Delete
// router.delete('/:id', auth, delete_progress);

export default router;