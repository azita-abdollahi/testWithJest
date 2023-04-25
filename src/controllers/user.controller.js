const { MongooseError } = require('mongoose');
const User = require('../models/user.model');

exports.getAllUser = async (req, res, next) => {
    try {
        const users = await User.find();
        res.status(200).json({
            status: 'success',
            result: users.length,
            data: {
                users,
            },
        });
    } catch (err) {
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const user = await User.findById(req.body.userId);
        if (!user) {
            res.status(404).json({ message: 'User Not Found'})
        }
        res.status(200).json({
            status: 'success',
            data: {
                user,
            },
        });
    } catch (err) {
        next(err);
    }
}

exports.createUser = async (req, res, next) => {
    try {
        const user = new User(
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            }
        );
        await user.save();
        res.status(200).json(
            {
                status: 'success',
                data: {
                    user,
                },
            }
        );
    } catch (err) {
        res.status(400).json({ message: 'invalid input'})
        next(err)
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        const user = await User.findOneAndUpdate(
            {_id: req.body.userId},
            {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password
            },
            {
                new: true
            }
            );
        if (!user) {
            res.status(404).json({ message: 'User Not Found'})
        }
        res.status(200).json({
            status: 'success',
            data: {
            user,
            },
        });
    } catch (err) {
        next(err);
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const user = await User.findByIdAndDelete(req.body.userId);
        if (!user) {
            res.status(404).json({ message: 'User Not Found'})
        }
        res.status(200).json({
            status: 'success',
            data: {
            user,
            },
        });
    } catch (err) {
        next(err)
    }
}