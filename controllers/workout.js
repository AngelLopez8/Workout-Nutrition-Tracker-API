import { Workout } from '../models/mymodels.model.js';
import { Exercise } from '../models/mymodels.model.js';

// CREATE
/**
 * Create workout
 */
export const create_workout = async (req, res) => {
    const exercises = await Exercise.find({ _id: { $in: req.body.exercises }});
    req.body.exercises = exercises;
    const workout = new Workout({ ...req.body});

    try {
        await workout.save();

        res.status(201).json(workout);
    } catch (err) {
        res.status(400).json(err);
    }
}

// READ
/**
 * Get workouts
 */
export const get_workouts = async (req, res) => {
    try {
        const workouts = await Workout.find();

        res.status(200).json(workouts);
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * Get specific workout
 */
export const get_workout = async (req, res) => {
    const _id = req.params.id;

    try {
        const workout = await Workout.findOne({ _id});

        if (!workout) return res.status(404).json({ error: 'Workout not found!' });

        res.status(200).json(workout);
    } catch (err) {
        res.status(500).json({ error: 'Unable to find workout.' });
    }
}

// UPDATE
/**
 * Update specific workout
 */
export const update_workout = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'description', 'exercises'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).json({ message: 'Invalid updates!' });

    try {
        const workout = await Workout.findOne({ _id: req.params.id});
         
        if (!workout) res.status(404).json({});

        updates.forEach( async update => {
            if (update !== 'exercises') {
                workout[update] = req.body[update];
            }
        });

        // Add exercises to current array
        if (updates.includes('exercises')) {
            const exercises = await Exercise.find({ _id: { $in: req.body.exercises }});
            workout['exercises'].push(...exercises);
        }

        await workout.save();

        res.status(200).json(workout);
    } catch (err) {
        res.status(400).json(err);
    }
}

// DELETE
/**
 * Delete workout
 */
// export const delete_workout = async (req, res) => {
//     try {
//         const workout = await Workout.findOneAndDelete({ _id: req.params.id});

//         if (!workout) res.status(404).json({ error: 'Workout not found!' });

//         res.status(200).json(workout);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }
