
// const jwt = require('jsonwebtoken');

import jwt from "jsonwebtoken"

class AuthenticationService {
    generate = async (user) => {
        return await jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (7 * 24 * 60 * 60), // expires in 1 week
            data: user,
        }, process.env.JWT_SECRET);
    };
}

const AuthenticationServiceSingleton = new AuthenticationService();

// module.export = AuthenticationServiceSingleton;
export default AuthenticationService