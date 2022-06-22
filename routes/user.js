import express from 'express';

const router = express.Router();

import auth from '../middleware/auth.js';
import upload from '../middleware/upload.js';
import {
    create_user, upload_avatar, login, logout, logout_all, get_my_info, get_my_avatar, 
    update_user, delete_user, delete_avatar
} from '../controllers/user.js';

// Create
router.post('/', create_user);

router.post('/me/avatar/', auth, upload.single('avatar'), upload_avatar, (error, req, res, next) => {
    res.status(400).json({ error: error.message });
});

router.post('/login', login);

router.post('/logout', auth, logout);

router.post('/logout/all', auth, logout_all);

// Read
router.get('/me', auth, get_my_info);

router.get('/me/avatar/:id', get_my_avatar);

// Update
router.patch('/me', auth, update_user);

// Delete
router.delete('/me', auth, delete_user);

router.delete('/me/avatar', auth, delete_avatar);

export default router;