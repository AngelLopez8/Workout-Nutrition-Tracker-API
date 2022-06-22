import mongoose from 'mongoose';
import { Schedule } from '../models/mymodels.model.js';
import { Workout } from '../models/mymodels.model.js';

// CREATE
/**
 * Create schedule
 */
export const create_schedule = async (req, res) => {
    const workouts = await Workout.find({ _id: { $in: req.body.workouts }});
    req.body.workouts = workouts;
    const schedule = new Schedule({ ...req.body});

    try {
        await schedule.save();

        res.status(201).json(schedule);
    } catch (err) {
        res.status(400).json(err);
    }
}

// READ
/**
 * Get schedules
 */
export const get_schedules = async (req, res) => {
    try {
        const schedules = await Schedule.find();

        res.status(200).json(schedules);
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * Get specific schedule
 */
export const get_schedule = async (req, res) => {
    const _id = req.params.id;

    try {
        const schedule = await Schedule.findOne({ _id});

        if (!schedule) return res.status(404).json({ error: 'schedule not found!' });

        res.status(200).json(schedule);
    } catch (err) {
        res.status(500).json({ error: 'Unable to find schedule.' });
    }
}

// UPDATE
/**
 * Update specific schedule
 */
export const update_schedule = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['numberOfDays', 'numberOfWorkoutsPerDay', 'workouts'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).json({ message: 'Invalid updates!' });

    try {
        const schedule = await Schedule.findOne({ _id: req.params.id});
         
        if (!schedule) res.status(404).json({});

        updates.forEach( update =>{
            if (update !== 'workouts')
                schedule[update] = req.body[update];
        });

        // Add workouts to current array
        if (updates.includes('workouts')) {
            const workouts = await Workout.find({ _id: { $in: req.body.workouts }});
            schedule['workouts'].push(...workouts);
        }

        await schedule.save();

        res.status(200).json(schedule);
    } catch (err) {
        res.status(400).json(err);
    }
}

// DELETE
/**
 * Delete schedule
 */
// export const delete_schedule = async (req, res) => {
//     try {
//         const schedule = await Schedule.findOneAndDelete({ _id: req.params.id});

//         if (!schedule) res.status(404).json({ error: 'schedule not found!' });

//         res.status(200).json(schedule);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }
