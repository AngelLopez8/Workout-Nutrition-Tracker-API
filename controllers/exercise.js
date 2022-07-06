import { Exercise } from '../models/mymodels.model.js';

// CREATE
/**
 * Create exercise
 */
export const create_exercise = async (req, res) => {
    const exercise = new Exercise({ ...req.body});

    try {
        await exercise.save();

        res.status(201).json(exercise);
    } catch (err) {
        res.status(400).json(err);
    }
}

// READ
/**
 * Get exercises
 */
export const get_exercises = async (req, res) => {
    try {
        const exercises = await Exercise.find();

        res.status(200).json(exercises);
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * Get specific exercise
 */
export const get_exercise = async (req, res) => {
    const _id = req.params.id;

    try {
        const exercise = await Exercise.findOne({ _id});

        if (!exercise) return res.status(404).json({ error: 'exercise not found!' });

        res.status(200).json(exercise);
    } catch (err) {
        res.status(500).json({ error: 'Unable to find exercise.' });
    }
}

// UPDATE
/**
 * Update specific exercise
 */
export const update_exercise = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name', 'bodyArea', 'sets', 'reps', 'time'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).json({ message: 'Invalid updates!' });

    try {
        const exercise = await Exercise.findOne({ _id: req.params.id});
         
        if (!exercise) res.status(404).json({});

        updates.forEach( update => exercise[update] = req.body[update] );
        await exercise.save();

        res.status(200).json(exercise);
    } catch (err) {
        res.status(400).json(err);
    }
}

// DELETE
/**
 * Delete exercise
 */
// export const delete_exercise = async (req, res) => {
//     try {
//         const exercise = await Exercise.findOneAndDelete({ _id: req.params.id});

//         if (!exercise) res.status(404).json({ error: 'exercise not found!' });

//         res.status(200).json(exercise);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }
