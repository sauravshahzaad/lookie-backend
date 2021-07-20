// import { UserModel } from '../models/User.js';

// export default (app) => {
//     app.post('/v1/users', async (req, res) => {
//         console.log(req.body)
//         // if (!req.isAdmin) {
//         //     return res.status(403).end();
//         // }
//         try {
//             const user = await UserModel.find(req.body.email);
//             if (user) {
//                 res.send(user);
//             } else {
//                 res.status(404).end();
//             }
//         } catch (e) {
//             res.status(404).end();
//         }
//     });

//     app.get('/v1/users/:id', async (req, res) => {
//         try {
//             const user = await UserModel.findById(req.params.id);
//             if (user) {
//                 res.send(user);
//             } else {
//                 res.status(404).end();
//             }
//         } catch (e) {
//             res.status(404).end();
//         }
//     });

//     app.post('/v1/users', (req, res) => {
//         if (!req.isAdmin) {
//             return res.status(403).end();
//         }
//         // TODO: Implement
//         res.status(200).end();
//     });

//     app.post('/v1/users/register', (req, res) => {
//         console.log(req.body)
//         try {
//             const user = UserModel(req.body);
//             user.save()
//             if (user) {
//                 res.send(user);
//             } else {
//                 res.status(404).end();
//             }
//         } catch (e) {
//             res.status(404).end();
//         }
//     });

//     app.put('/v1/users/:id', (req, res) => {
//         if (!req.isAdmin) {
//             return res.status(403).end();
//         }
//         // TODO: Implement
//         res.status(200).end();
//     });

//     app.delete('/v1/users/:id', (req, res) => {
//         if (!req.isAdmin) {
//             return res.status(403).end();
//         }
//         // TODO: Implement
//         res.status(200).end();
//     });
// }

// const express = require('express');

import User from "../models/User.js"
import auth from "../middleware/auth.js"
import cred from "../cred/database.js"
import express from 'express';
import formateForMail from "../config/formatsformail.js"
import genRandom from "../config/genrandom.js"
import jwt from "jsonwebtoken"
import jwtDecode from "jwt-decode"
import nodeMailer from "../config/nodemailer.js"
import passport from 'passport';

const router = express.Router();
// const passport = require('passport');

// const User = require('../models/user');


// import  from ""
// const jwt = require('jsonwebtoken');
// const cred = require('../cred/database');
// const genRandom = require('../config/genrandom');
// const jwtDecode = require('jwt-decode');
// const formateForMail = require('../config/formatesformail');
// const nodeMailer = require('../config/nodemailer');






// import { getUserByEmail } from "../models/User.js"

// import { UserModel } from '../models/User.js';
export default (router) => {
    router.get('/users', (req, res) => {
        res.send("you are at /users")
    })
    router.post('/users/register', (req, res) => {
        let newUser = new User({
            name: req.body.name,
            email: req.body.email,
            userName: req.body.userName,
            password: req.body.password,
            mobile: req.body.mobile
        });

        //To check if the email has been registered
        User.getUserByEmail(newUser.email, (err, user) => {
            if (err) {
                throw err;
            } else {
                if (user == null) {
                    //Saving the user data in database
                    User.addUser(newUser, (err, user) => {
                        if (err) {
                            res.json({
                                success: false,
                                msg: 'FAILED to Register  the User',
                                err: err
                            });
                        } else {
                            res.json({
                                success: true,
                                msg: 'Successfully User Registered '
                            });
                        }
                    });
                } else {
                    res.json({
                        success: false,
                        msg: 'Email addresss is alredy been Registered. Try with a new one'
                    });
                }
            }
        });
    });

    //Authenticate
    router.post('/users/authenticate', (req, res) => {
        const email = req.body.email;
        const password = req.body.password;
        User.getUserByEmail(email, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                return res.json({
                    success: false,
                    msg: 'Email or Password is wrong'
                });
            }
            User.comparePassword(password, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    const token = jwt.sign(
                        {
                            data: user
                        },
                        cred.JWT_SECRET,
                        {
                            expiresIn: 604800 //1 week
                        }
                    );
                    // console.log(user, "in routes")
                    res.cookie('token', token).json({
                        success: true,
                        msg: 'Successfully Login ',
                        token: "Bearer " + token,
                        user: {
                            name: user.name,
                            username: user.username,
                            email: user.email,
                            mobile: user.mobile,
                            id: user._id
                        }
                    });
                } else {
                    return res.json({
                        success: false,
                        msg: 'Email or Password is wrong'
                    });
                }
            });
        });
    });
    router.get('/users/verify', auth.isAuthenticated, (req, res) => {
        res.send("Successfully verified");
    })
    //Profile
    router.get('/users/profile', auth.isAuthenticated, (req, res) => {
        console.log(req)
        res.json({
            name: req.name,
            userName: req.userName,
            email: req.email,
            mobile: req.mobile
        });
    });

    //ChangePassword
    router.post('/users/changepassword', auth.isAuthenticated, (req, res) => {
        const oldPassword = req.body.oldPassword;
        const newPassword = req.body.newPassword;
        User.getUserByEmail(req.email, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                return res.json({
                    success: false,
                    msg: 'Something Went Wrong'
                });
            }
            User.comparePassword(oldPassword, user.password, (err, isMatch) => {
                if (err) throw err;
                if (isMatch) {
                    // Update New Password
                    User.updatePassword(req.email, newPassword, (err, user) => {
                        if (err) {
                            throw err;
                        }
                        if (!user) {
                            return res.json({
                                success: false,
                                msg: 'Password is not Changed'
                            });
                        } else {
                            return res.json({
                                success: true,
                                msg: 'Password is Changed'
                            });
                        }
                    });
                } else {
                    return res.json({
                        success: false,
                        msg: 'Wrong Password'
                    });
                }
            });
        });
    });

    //ForgotPassword
    router.post('/users/forgotpassword', (req, res) => {
        const email = req.body.email;
        User.getUserByEmail(email, (err, user) => {
            if (err) {
                throw err;
            } else {
                if (user == null) {
                    res.json({
                        success: false,
                        msg: 'Email addresss is not registered'
                    });
                } else {
                    const token = jwt.sign(
                        {
                            data: {
                                email: email
                            }
                        },
                        cred.JWT_SECRET,
                        {
                            expiresIn: 600
                        }
                    );
                    const msg = formateForMail('forgotPassword', token);
                    nodeMailer(email, 'ProjectZeros Password Assistance', msg);
                    return res.json({
                        success: true,
                        msg: 'Mail is sent to the registered mail address'
                    });
                }
            }
        });
    });

    //ResetPassword
    router.post('/users/resetpassword', (req, res) => {
        const password = req.body.newPassword;
        const email = jwtDecode(req.body.token).data.email;
        User.getUserByEmail(email, (err, user) => {
            if (err) {
                throw err;
            }
            if (!user) {
                return res.json({
                    success: false,
                    msg: 'Something Went Wrong'
                });
            }
            User.updatePassword(email, password, (err, user) => {
                if (err) {
                    throw err;
                }
                return res.json({
                    success: true,
                    msg: 'Password is Changed'
                });
            });
        });
    });
    router.get('/users/signOut', (req, res) => {
        req.logOut();
        res.status(200).clearCookie('token', {
            path: '/'
        });
        // req.session.destroy(function (err) {
        res.redirect('/');
        // });
    })
}

// module.exports = router;