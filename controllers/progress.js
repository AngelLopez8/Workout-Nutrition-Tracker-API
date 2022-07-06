import { Progress } from "../models/mymodels.model.js";
import { Schedule } from "../models/mymodels.model.js";

const DaysOfTheWeek = {
    "Sunday": 0,
    "Monday": 1,
    "Tuesday": 2,
    "Wednesday": 3,
    "Thursday": 4,
    "Friday": 5,
    "Saturday": 6
};

// CREATE
/**
 * Create Progress
 */
export const create_progress = async (req, res) => {
    
    // Find Schedule by id to reassign on req.body
    const schedule = await Schedule.findOne({ _id: req.body.schedule });
    
    // Find next workout day to set as startDate
    const firstWorkout = schedule.daysOfTheWeek[0];
    const firstWorkoutDay = DaysOfTheWeek[firstWorkout];

    let today = new Date();

    while (today.getDay() !== firstWorkoutDay) {
        today.setDate(today.getDate() + 1);
    }
    
    // Overwrite req.body with actual Objects
    req.body.startDate = today;
    req.body.schedule = schedule;

    // Create new Progress
    const progress = new Progress({ ...req.body, user: req.user._id });

    try {
        await progress.save();

        res.status(201).json(progress);
    } catch (err) {
        res.status(400).json(err);
    }
}

// READ
/**
 * Get Progresss
 */
export const get_progresss = async (req, res) => {
    try {
        const progresss = await Progress.find({ user: req.user._id });

        res.status(200).json(progresss);
    } catch (err) {
        res.status(500).json(err);
    }
}

/**
 * Get specific Progress
 */
export const get_progress = async (req, res) => {
    const _id = req.params.id;

    try {
        const progress = await Progress.findOne({ _id, user: req.user._id});

        if (!progress) return res.status(404).json({ error: 'Progress not found!' });

        res.status(200).json(progress);
    } catch (err) {
        res.status(500).json({ error: 'Unable to find progress.' });
    }
}

// UPDATE
/**
 * Update specific Progress
 */
export const update_progress = async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['completeDate', 'weight', 'height', 'workoutsDone'];
    const isValidOperation = updates.every( update => allowedUpdates.includes(update));

    if (!isValidOperation) return res.status(400).json({ message: 'Invalid updates!' });

    try {
        const progress = await Progress.findOne({ _id: req.params.id});
         
        if (!progress) res.status(404).json({});

        updates.forEach( update => progress[update] = req.body[update] );
        await progress.save();

        res.status(200).json(progress);
    } catch (err) {
        res.status(400).json(err);
    }
}

// DELETE
/**
 * Delete Progress
 */
// export const delete_progress = async (req, res) => {
//     try {
//         const progress = await Progress.findOneAndDelete({ _id: req.params.id});

//         if (!progress) res.status(404).json({ error: 'Progress not found!' });

//         res.status(200).json(progress);
//     } catch (err) {
//         res.status(500).json(err);
//     }
// }
