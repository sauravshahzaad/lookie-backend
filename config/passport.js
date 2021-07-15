// const JwtStrategy = require('passport-jwt').Strategy;
// const ExtractJwt = require('passport-jwt').ExtractJwt;
// import { JwtStrategy, ExtractJwt } from "passport-jwt"
import passportJWT from "passport-jwt";

const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;
// const User = require('../models/user');
import User from "../models/User.js"
// const cred = require('../cred/database');
import cred from "../cred/database.js"


export default function (passport) {
    let opts = {};
    // opts.jwtFromRequest = ExtractJwt.fromAuthHeaderWithScheme("jwt");
    opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
    // fromAuthHeaderAsBearerToken
    opts.secretOrKey = cred.JWT_SECRET;
    console.log(opts.jwtFromRequest)
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {

        User.getUserById(jwt_payload.data._id, (err, user) => {
            if (err) {
                return done(err, false);
            }
            if (user) {
                return done(null, user);
            } else {
                return done(null, false);
            }
        });
    }));

}