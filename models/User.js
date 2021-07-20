// import mongoose from 'mongoose';

// export const UserSchema = new mongoose.Schema({
//     email: String,
//     username: String,
//     role: String,
// });

// export const UserModel = mongoose.model('User', UserSchema);
// const mongoose = require('mongoose');

import bycrpt from 'bcryptjs';
import mongoose from 'mongoose';

// const bycrpt = require('bcryptjs');


//User Schema
export const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    email: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: Number,
        required: true
    }
});

// const User = module.exports = mongoose.model('User', userSchema, 'users');
const User = mongoose.model('User', UserSchema);
export default User

// module.exports.getUserById = function (id, callback) {
//     User.findById(id, callback);
// }

// module.exports.getUserByEmail = function (email, callback) {
//     const query = {
//         email: email
//     }
//     User.findOne(query, callback);
// }

// module.exports.updatePassword = function (email, newPassword, callback) {
//     const query = {
//         email: email
//     }
//     bycrpt.genSalt(10, (err, salt) => {
//         bycrpt.hash(newPassword, salt, (err, hash) => {
//             if (err) {
//                 throw err;
//             }
//             newPassword = hash;
//             const toChangeQuery = {
//                 password: newPassword
//             }
//             User.findOneAndUpdate(query, toChangeQuery, callback);
//         });
//     });

// }


// module.exports.addUser = function (newUser, callback) {
//     bycrpt.genSalt(10, (err, salt) => {
//         bycrpt.hash(newUser.password, salt, (err, hash) => {
//             if (err) {
//                 throw err;
//             }
//             newUser.password = hash;
//             newUser.save(callback);
//         });
//     });
// }

// module.exports.comparePassword = function (candidatePassword, hash, callback) {
//     bycrpt.compare(candidatePassword, hash, (err, isMatch) => {
//         if (err) throw err
//         callback(null, isMatch);
//     });
// }
User.getUserById = function (id, callback) {
    User.findById(id, callback);
}

User.getUserByEmail = function (email, callback) {
    const query = {
        email: email
    }
    User.findOne(query, callback);
}

User.updatePassword = function (email, newPassword, callback) {
    const query = {
        email: email
    }
    bycrpt.genSalt(10, (err, salt) => {
        bycrpt.hash(newPassword, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newPassword = hash;
            const toChangeQuery = {
                password: newPassword
            }
            User.findOneAndUpdate(query, toChangeQuery, callback);
        });
    });

}


User.addUser = function (newUser, callback) {
    bycrpt.genSalt(10, (err, salt) => {
        bycrpt.hash(newUser.password, salt, (err, hash) => {
            if (err) {
                throw err;
            }
            newUser.password = hash;
            newUser.save(callback);
        });
    });
}

User.comparePassword = function (candidatePassword, hash, callback) {
    bycrpt.compare(candidatePassword, hash, (err, isMatch) => {
        if (err) throw err
        callback(null, isMatch);
    });
}

// User.schema = User;