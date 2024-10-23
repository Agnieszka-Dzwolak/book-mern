import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import User from '../models/user.js';

import hashPassword from '../utils/hashPassword.js';
import matchPasswords from '../utils/matchPasswords.js';
import validateEmail from '../utils/validateEmail.js';
import validatePassword from '../utils/validatePassword.js';

const userControllers = {
    register: async (req, res) => {
        const { email, password, rePassword } = req.body;
        try {
            //check if user exists
            const userExists = await User.findOne({ email: email });

            if (userExists) {
                return res.status(400).json({
                    message: 'User already exists. Please login'
                });
            }
            //validate email, password, check if passwords match
            const isValidEmail = validateEmail(email);
            const isValidPassword = validatePassword(password);
            const doPasswordsMatch = matchPasswords(password, rePassword);

            if (isValidEmail && isValidPassword && doPasswordsMatch) {
                //hash password
                const hashedPassword = hashPassword(password);

                //create user and save to database
                const newUser = new User({
                    email: email,
                    password: hashedPassword
                });
                await newUser.save();

                res.status(200).json(newUser);
            } else {
                res.status(400).json({ message: 'Invalid email or password' });
            }
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    },
    login: async (req, res) => {
        const { email, password } = req.body;

        try {
            //check if user exist
            const userExists = await User.findOne({ email: email });

            if (!userExists) {
                return res
                    .status(400)
                    .json({ message: 'User does not exist. Please register' });
            }
            //check passwords
            bcrypt.compare(password, userExists.password, (err, isValid) => {
                if (err) {
                    console.error(err);
                }
                if (isValid) {
                    //create token
                    const token = jwt.sign(
                        { email: userExists.email },
                        process.env.TOKEN_SECRET
                    );
                    //set cookies
                    res.cookie('token', token, { httpOnly: true });

                    res.status(200).json({
                        message: 'User logged successfully'
                    });
                }
            });
        } catch (err) {
            res.status(500).json({ message: 'Server error' });
        }
    },
    logout: async (req, res) => {
        //clear cookies
        res.clearCookie('token');
        res.status(200).json({ message: 'User logged out successfully' });
    }
};

export default userControllers;
