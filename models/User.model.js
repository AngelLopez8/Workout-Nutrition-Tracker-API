import mongoose from 'mongoose';
import validator from 'validator';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import ScheduleSchema from './Schedule.schema.js';
import ProgressSchema from './Progress.schema.js';

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a positive number')
            }
        }
    }, 
    weight: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Weight must be a positive number in lbs');
            }
        }
    },
    height: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Height must be a positive number in inches');
            }
        }
    },
    schedule: {
        type: ScheduleSchema,
        default: null
    },
    progress: [ProgressSchema],
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }],
    avatar: {
        type: Buffer
    }
}, {
    timestamps: true
});

UserSchema.virtual('progresss', {
    ref: 'Progress',
    localField: '_id',
    foreignField: 'user'
});

// returns user object without password or tokens
// UserSchema.methods.getPublicProfile = function () {
UserSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;
    delete userObject.tokens;
    delete userObject.avatar;

    return userObject;
}

// generates Authenication Token for user
UserSchema.methods.generateAuthToken = async function () {
    const user = this;
    const token = jwt.sign({ _id: user._id.toString()}, process.env.SECRET_KEY);
    
    user.tokens = user.tokens.concat({ token });
    await user.save();

    return token;
}

// check email and password are correct
UserSchema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email });

    if (!user) {
        throw new Error('Unable to login');
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
        throw new Error('Unable to login');
    }

    return user;
}

// Hash the plain text password before saving
UserSchema.pre('save', async function (next) {
    const user = this;
    
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8);
    }
    
    next();
});

const User = mongoose.model('User', UserSchema);

export default User;