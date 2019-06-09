const cors = require('cors');
const bodyParser = require('body-parser');
// const jwt = require('express-jwt');
const verifyToken =  require("../util/verifyToken");


// const jwt = require('express-jwt');

// Import Route Controllers
const users = require('./Controllers/User/UserController');


// authentication middleware
// const authMiddleware = jwt({
//     secret: 'somesuperdupersecret'
// });

// Setup Route Bindings
exports = module.exports = function (app) {

// middlewares
// Configure app for bodyParser()
// lets us grab data from the body of POST
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(cors());

    // auth middleware
    // const auth = jwt({
    //     secret: config.jwt.secret,
    //     credentialsRequired: false
    // });
    // MIDDLEWARE -
// Middleware can be very useful for doing validations. We can log
// things from here or stop the request from continuing in the event
// that the request is not safe.
// middleware to use for all requests
// router.use(function (req, res, next) {
//     // console.log('middleware going on...');
//     next();
// });

    app.route('/api/users')
        .get(users.all)
        .post(users.create);
    app.get('/api/users/:id', users.getOne);
    app.put('/api/users/:id', verifyToken,  users.update);
    app.post('/api/login',  users.login);
};