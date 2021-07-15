
// "express-jwt": "^5.3.1",
// "jsonwebtoken": "^8.4.0",
//npm run dev

// "babel-cli": "^6.26.0",
//     "babel-core": "^6.26.3",
//     "babel-jest": "^23.6.0",
//     "babel-preset-es2015": "^6.24.1",
//     "babel-preset-stage-2": "^6.24.1",
//     "jest": "^23.6.0",
//     "nodemon": "^1.18.5",
//     "regenerator-runtime": "^0.12.1"

import bodyParser from 'body-parser';
import compression from 'compression';
import cors from 'cors';
import express from 'express';
import helmet from 'helmet';
// import { db } from './db/index';

import getAuthRoutes from './routes/auth.js';
import getProductRoutes from './routes/products.js';
// import getUserRoutes from './routes/users.js';
import getOrderRoutes from './routes/orders.js';
import logger from './middleware/logger.js';
import withAdminPermission from './middleware/withAdminPermission.js';
// import withAuthenticated from './middleware/withAuthentication.js';
import db from './db/index.js';
import passport from "passport"
const app = express();
app.use(helmet());
app.use(compression());


//Cors Middleware
app.use(cors());
//Body-Parser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Passport Middleware
app.use(passport.initialize());
app.use(passport.session());
// require('./config/passport')(passport);
import myFunc from "./config/passport.js";
myFunc(passport);

// app.use(withAuthenticated);
// app.use(withAdminPermission);
app.use(logger);
// getUserRoutes(app);
getProductRoutes(app);
getAuthRoutes(app);
getOrderRoutes(app);

app.get('/', (req, res) => res.send({
    dateTime: new Date().toJSON()
}));
//So anything with /users will go to ./routes/users
import getUserRoutes from "./routes/users.js"
// app.use('/users', users);
getUserRoutes(app);

const port = process.env.PORT || 5000;
app.listen(port, () =>
    console.log(`Server running at http://localhost:${port}`)
);