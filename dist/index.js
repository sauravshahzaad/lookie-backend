"use strict";

var _bodyParser = _interopRequireDefault(require("body-parser"));

var _compression = _interopRequireDefault(require("compression"));

var _cors = _interopRequireDefault(require("cors"));

var _express = _interopRequireDefault(require("express"));

var _helmet = _interopRequireDefault(require("helmet"));

var _auth = _interopRequireDefault(require("./routes/auth.js"));

var _products = _interopRequireDefault(require("./routes/products.js"));

var _appointment = _interopRequireDefault(require("./routes/appointment.js"));

var _logger = _interopRequireDefault(require("./middleware/logger.js"));

var _withAdminPermission = _interopRequireDefault(require("./middleware/withAdminPermission.js"));

var _index = _interopRequireDefault(require("./db/index.js"));

var _passport = _interopRequireDefault(require("passport"));

var _passport2 = _interopRequireDefault(require("./config/passport.js"));

var _users = _interopRequireDefault(require("./routes/users.js"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

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
// import { db } from './db/index';
// import withAuthenticated from './middleware/withAuthentication.js';
var app = (0, _express["default"])();
app.use((0, _helmet["default"])());
app.use((0, _compression["default"])()); //Cors Middleware

app.use((0, _cors["default"])()); //Body-Parser Middleware

app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
})); //Passport Middleware

app.use(_passport["default"].initialize());
app.use(_passport["default"].session()); // require('./config/passport')(passport);

(0, _passport2["default"])(_passport["default"]); // app.use(withAuthenticated);
// app.use(withAdminPermission);

app.use(_logger["default"]); // getUserRoutes(app);

(0, _products["default"])(app);
(0, _auth["default"])(app);
(0, _appointment["default"])(app);
app.get('/', function (req, res) {
  return res.send({
    dateTime: new Date().toJSON()
  });
}); //So anything with /users will go to ./routes/users

// app.use('/users', users);
(0, _users["default"])(app);
var port = process.env.PORT || 5000;
app.listen(port, function () {
  return console.log("Server running at http://localhost:".concat(port));
});