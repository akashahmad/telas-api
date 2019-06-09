const db = require("../../../models");
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
const config = require("../../../config/config.json");

const UserController = {
    //getting data from database
    all: (req, res) => {
        const response = {};
        try {
            db.user.findAll({
                attributes: ['id', 'firstName', 'email']
            })
                .then(data => {
                    response.statusCode = 203;
                    response.body = JSON.stringify({
                        message: 'Ok',
                        data: data
                    });
                    res.status(response.statusCode).send(response.body);
                }).catch(err => {
                response.statusCode = 500;
                response.body = JSON.stringify({err});
                res.status(response.statusCode).send(response.body);
            });

        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        }
    },
    getOne: (req, res) => {
        const response = {};
        try {
            if("undefined" !== req.params.id){
                db.user.findOne({
                    attributes: ['id', 'firstName', 'email'],
                    where: {id: req.params.id}
                }).then(data=>{
                    response.statusCode = 203;
                    response.body = JSON.stringify({
                        message: 'Ok',
                        data: data
                    });
                    res.status(response.statusCode).send(response.body);
                })
                    .catch(err=>{
                        response.statusCode = 500;
                        response.body = JSON.stringify({err});
                        res.status(response.statusCode).send(response.body);
                    });
            }
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        }
    },
    create: (req, res) => {
        const response = {};
        try {
            let password = bcrypt.hashSync(req.body.password, 10);
            db.user.create({
                firstName: req.body.firstName, lastName:req.body.lastName, email:req.body.email, password: password
                }).then(data=>{
                // signin user and generate a jwt
                const token = jsonwebtoken.sign({
                    id: data.id,
                    email: data.email
                }, config.jwt.secret, { expiresIn: '1y' })
                    response.statusCode = 203;
                    response.body = JSON.stringify({
                        message: 'New User Created',
                        data: data,
                        token: token
                    });
                res.status(response.statusCode).send(response.body);
            })
                    .catch(err=>{
                        response.statusCode = 501;
                        response.body = JSON.stringify({err});
                        res.status(response.statusCode).send(response.body);
                        res.status(response.statusCode).send(response.body);
                    });
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({errors:err});
            res.status(response.statusCode).send(response.body);
        }
    },
    update: (req, res) => {
        const response = {};
        try {
            let data = [];
            if(req.body.hasOwnProperty("password")){
                data["password"] = bcrypt.hashSync(req.body.password, 10);
            }
            data["firstName"] = req.body.firstName;
            data["lastName"] = req.body.lastName;
            data["email"] = req.body.email;
            let password = bcrypt.hashSync(req.body.password, 10);
            db.user.update(data, {
                where: {
                    id:req.params.id
                }
            }).then(()=>{
                    response.statusCode = 203;
                    response.body = JSON.stringify({
                        message: 'User Updated',
                        data: ""
                    });
                res.status(response.statusCode).send(response.body);
            })
                    .catch(err=>{
                        response.statusCode = 506;
                        response.body = JSON.stringify({err});
                        console.log(err);
                        res.status(response.statusCode).send(response.body);
                    });
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        }
    },
    delete: (req, res) => {
        const response = {};
        try {
            db.user.destroy({
                where: {
                    id:req.body.id
                }
            }).then(()=>{
                    response.statusCode = 203;
                    response.body = JSON.stringify({
                        message: 'User Deleted',
                        data: ""
                    });
                res.status(response.statusCode).send(response.body);
            })
                    .catch(err=>{
                        response.statusCode = 500;
                        response.body = JSON.stringify({err});
                        res.status(response.statusCode).send(response.body);
                    });
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        }
    },
    login: (req, res) => {
        const response = {};
        try {
            db.user.findOne({
                where: { email:req.body.email }
            }).then((user)=>{
                if (!user) {
                    //throw new Error('No user with that email')
                    response.statusCode = 500;
                    response.body = JSON.stringify({
                        message: 'Incorrect credentials',
                        data: ""
                    });
                    res.status(response.statusCode).send(response.body);
                }
                else {
                    bcrypt.compare(req.body.password, user.password)
                        .then(valid => {
                            if (!valid) {
                                //throw new Error('No user with that email')
                                response.statusCode = 404;
                                response.body = JSON.stringify({
                                    message: 'Incorrect credentials',
                                    data: ""
                                });
                                res.status(response.statusCode).send(response.body);
                            }
                            else {
                                // signin user and generate a jwt
                                const token = jsonwebtoken.sign({
                                    id: user.id,
                                    email: user.email
                                }, config.jwt.secret, { expiresIn: '1y' })

                                // return json web token
                                response.statusCode = 203;
                                response.body = JSON.stringify({
                                    message: 'User LoggedIN',
                                    data: "",
                                    token: token
                                });
                                res.status(response.statusCode).send(response.body);
                            }
                        })
                }
                })
                    .catch(err=>{
                        response.statusCode = 500;
                        response.body = JSON.stringify({err});
                        res.status(response.statusCode).send(response.body);
                    });
        } catch (err) {
            response.statusCode = 500;
            response.body = JSON.stringify({err});
            res.status(response.statusCode).send(response.body);
        }
    }
};
module.exports = UserController;