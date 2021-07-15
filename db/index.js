// var mongoose = require('mongoose');

import mongoose from "mongoose";

const name='dauleadmin'
const pass = "9204315195dD@"
const dbName = "Bank"
const mongoAtlasUri =
    `mongodb+srv://${name}:${pass}@cluster0.yhimq.mongodb.net/${dbName}?retryWrites=true&w=majority`;
try {
    // Connect to the MongoDB cluster
    mongoose.connect(
        mongoAtlasUri,
        {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false
        },
        () => console.log("Mongoose is connected"),
    );
} catch (e) {
    console.log("could not connect");
}
const db = mongoose.connection;

db.on('error', (error) => {
    console.error(error);
});

db.once('open', () => {
    console.log('Database connection is open!');
});

export default db;