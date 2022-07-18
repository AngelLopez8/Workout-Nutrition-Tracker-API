import sharp from 'sharp';

import User from '../models/User.model.js';
import { Schedule } from '../models/mymodels.model.js';

// CREATE
/**
 * Creates a new User
*/
export const create_user = async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();

        const token = await user.generateAuthToken();

        res.status(201).json({ user, token });
    } catch (err) {
        res.status(400).json(err);
    }
}

/** 
 * Upload user Avatar
*/
export const upload_avatar = async (req, res) => {
    const buffer = await sharp(req.file.buffer).resize({ width: 250, height: 250 }).png().toBuffer();
    req.user.avatar = buffer;

    await req.user.save();

    res.status(200).json({});
}

/**
 * Login with given email and password
 */
export const login = async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.generateAuthToken();

        res.status(200).json({ user, token });
    } catch (err) {
        res.status(400).json({ 'error': 'Unable to login' });
    }
}


/**
 * Logout user and delete token
 */
export const logout = async (req, res) => {
    try {
        req.user.tokens = req.user.tokens.filter( token => token.token !== req.token);
        await req.user.save();

        res.status(200).send();
    } catch (err) {
        res.status(404).json({ error: 'Unable to Logout' });
    }
}

/**
 * Logout all deletes all tokens
 */
export const logout_all = async (req, res) => {
    try {
        await User.updateOne({ id: req.user._id }, { $set: { tokens: [] }});

        res.status(200).json({});
    } catch (err) {
        res.status(500).json({ error: 'Unable to Logout'  });
    }
}

// READ
/**
 * Sends user info
 */
export const get_my_info = async (req, res) => {
    res.status(200).json(req.user);
}

/**
 * Get user avatar
 */
export const get_my_avatar = async (req, res) => {
    try {
        const user = await User.findById(req.params.id);

        if (!user || !user.avatar) {
            throw new Error();
        }

        res.set('Content-Type', 'image/png');
        res.send(user.avatar);
    } catch (err) {
        res.status(404).json({ error: 'Unable to access user avatar.' });
    }
}

// UPDATE
/**
 * Update user
 */
export const update_user = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowUpdates = ['name', 'email', 'password', 'age', 'height', 'weight', 'schedule', 'progress'];
    const isValidOperation = updates.every( update => allowUpdates.includes(update));

    if (!isValidOperation) return res.status(400).json({ message: 'Invalid updates!' });

    if (req.body['schedule'] !== null) req.body['schedule'] = await Schedule.findById(req.body['schedule']);
    
    try {
        updates.forEach( update => req.user[update] = req.body[update]);

        await req.user.save();

        res.status(200).json(req.user);
    } catch (err) {
        res.status(400).json(err);
    }
}

// DELETE
/**
 * Delete user
 */
export const delete_user = async (req, res) => {
    try {
        // await req.user.remove();
        await User.deleteOne({ id: req.user._id });

        res.status(200).json(req.user);
    } catch (err) {
        res.status(500).json({ error: 'Unable to delete user.' });
    }
}

/**
 * Delete user avatar
 */
export const delete_avatar = async (req, res) => {
    try {
        req.user.avatar = undefined;

        await req.user.save();

        res.status(200).json({});
    } catch (err) {
        res.status(500).json({ error: 'Unable to delete user avatar.' });
    }
}