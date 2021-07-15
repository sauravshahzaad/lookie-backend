// const jwt = require('jsonwebtoken'),
//     config = require('../config');
import jwt from "jsonwebtoken"
// import config from "../config"
import cred from "../cred/database.js"
export default {
    isAuthenticated: function (req, res, next) {
        // console.log(req)
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token || undefined;
        if (token === undefined) {
            res.status(401).send('Unauthorized: No token provided');
        }
        if (!token) {
            res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, cred.JWT_SECRET, function (err, decoded) {
                // console.log("decoded", decoded)
                if (err) {
                    console.log(err, "error")
                    res.status(401).send('Unauthorized: Invalid token');
                } else {
                    req.name = decoded.data.name;
                    req.username = decoded.data.username;
                    req.email = decoded.data.email;
                    next();
                }
            });
        }
    },
    getUserData: function (req, res, next) {
        const token =
            req.body.token ||
            req.query.token ||
            req.headers['x-access-token'] ||
            req.cookies.token;
        if (!token) {
            res.status(401).send('Unauthorized: No token provided');
        } else {
            jwt.verify(token, cred.JWT_SECRET, function (err, decoded) {
                req.name = decoded.name;
                req.username = decoded.username;
                next();
            });
        }
    }
};