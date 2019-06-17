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
                attributes: ['id', ['first_name','firstName'], 'email'],
                include: ['user_meta']
            })
                .then(data => {
                    response.statusCode = 200;
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
                    attributes: ['id', 'first_name', 'email'],
                    where: {id: req.params.id}
                }).then(data=>{
                    response.statusCode = 200;
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
            if(!req.body.firstName){
                response.statusCode = 400;
                response.body = JSON.stringify({
                    message: 'First Name is required',
                    data: "",
                });
                res.status(response.statusCode).send(response.body);
            }
            if(!req.body.email){
                response.statusCode = 400;
                response.body = JSON.stringify({
                    message: 'Email is required',
                    data: "",
                });
                res.status(response.statusCode).send(response.body);
            }
            if(!req.body.password){
                response.statusCode = 400;
                response.body = JSON.stringify({
                    message: 'Password is required',
                    data: "",
                });
                res.status(response.statusCode).send(response.body);
            }
            else {
                return db.user.count({ where: { email: req.body.email } })
                    .then(count => {
                        if (count != 0) {
                            response.statusCode = 400;
                            response.body = JSON.stringify({
                                message: 'Email already Exsist',
                                data: "",
                            });
                            res.status(response.statusCode).send(response.body);
                        }
                        else {
                            let password = bcrypt.hashSync(req.body.password, 10);
                            db.user.create({
                                first_name: req.body.firstName,
                                last_name:req.body.lastName,
                                email:req.body.email,
                                password: password,
                                profile_type: req.body.profileType,
                                cpf: req.body.cpf,
                                dob: req.body.dob,
                                gender: req.body.gender,
                                monday_opening_door: req.body.mondayOpeningDoor,
                                monday_closing_door: req.body.mondayClosingDoor,
                                monday_lunch_from: req.body.mondayLunchFrom,
                                monday_lunch_to: req.body.mondayLunchTo,
                                tuesday_opening_door: req.body.tuesdayOpeningDoor,
                                tuesday_closing_door: req.body.tuesdayClosingDoor,
                                tuesday_lunch_from: req.body.tuesdayLunchFrom,
                                tuesday_lunch_to: req.body.tuesdayLunchTo,
                                wednesday_opening_door: req.body.wednesdayOpeningDoor,
                                wednesday_closing_door: req.body.wednesdayClosingDoor,
                                wednesday_lunch_from: req.body.wednesdayLunchFrom,
                                wednesday_lunch_to: req.body.wednesdayLunchTo,
                                thursday_opening_door: req.body.thursdayOpeningDoor,
                                thursday_closing_door: req.body.thursdayClosingDoor,
                                thursday_lunch_from: req.body.thursdayLunchFrom,
                                thursday_lunch_to: req.body.thursdayLunchTo,
                                friday_opening_door: req.body.fridayOpeningDoor,
                                friday_closing_door: req.body.fridayClosingDoor,
                                friday_lunch_from: req.body.fridayLunchFrom,
                                friday_lunch_to: req.body.fridayLunchTo,
                                saturday_opening_door: req.body.saturdayOpeningDoor,
                                saturday_closing_door: req.body.saturdayClosingDoor,
                                saturday_lunch_from: req.body.saturdayLunchFrom,
                                saturday_lunch_to: req.body.saturdayLunchTo,
                                sunday_opening_door: req.body.sundayOpeningDoor,
                                sunday_closing_door: req.body.sundayClosingDoor,
                                sunday_lunch_from: req.body.sundayLunchFrom,
                                sunday_lunch_to: req.body.sundayLunchTo,
                                interval: req.body.interval,
                                monday_flag: req.body.mondayFlag,
                                monday_schedule: req.body.mondaySchedule,
                                tuesday_flag: req.body.tuesdayFlag,
                                tuesday_schedule: req.body.tuesdaySchedule,
                                wednesday_flag: req.body.wednesdayFlag,
                                wednesday_schedule: req.body.wednesdaySchedule,
                                thursday_flag: req.body.thursdayFlag,
                                thursday_schedule: req.body.thursdaySchedule,
                                friday_flag: req.body.fridayFlag,
                                friday_schedule: req.body.fridaySchedule,
                                saturday_flag: req.body.saturdayFlag,
                                saturday_schedule: req.body.saturdaySchedule,
                                sunday_flag: req.body.sundayFlag,
                                sunday_schedule: req.body.sundaySchedule,
                                twenty_four: req.body.twentyFour,
                                home_service: req.body.homeService,
                                number_of_customers_per_schedule: req.body.numberOfCustomersPerSchedule
                            }).then(data=>{
                                let {meta} = req.body;
                                if(meta){
                                    let metaDestructure = [];
                                    if(meta.length>0){
                                        meta.forEach((item)=>{
                                            metaDestructure.push({
                                                user_id : data.id,
                                                meta_key : item.metaKey,
                                                meta_value: item.metaValue
                                            });
                                        })
                                    }
                                    db.user_meta.bulkCreate(metaDestructure)
                                }
                                // signin user and generate a jwt
                                const token = jsonwebtoken.sign({
                                    id: data.id,
                                    email: data.email
                                }, config.jwt.secret, { expiresIn: '1y' });
                                let finalMeta = [];
                                if(meta){
                                    db.user_meta.findAll({
                                        attributes: ['id', ['meta_key','metaKey'],['meta_value','metaValue'],['user_id','userId']],
                                        where: {user_id: data.id}
                                    }).then(metaData=>{
                                        finalMeta = [...metaData];
                                        data = {
                                            firstName: data.first_name,
                                            last_name: data.lastName,
                                            email: data.email,
                                            profileType: data.profile_type,
                                            cpf: data.cpf,
                                            dob: data.dob,
                                            gender: data.gender,
                                            mondayOpeningDoor: data.monday_opening_door,
                                            mondayClosingDoor: data.monday_closing_door,
                                            mondayLunchFrom: data.monday_lunch_from,
                                            mondayLunchTo: data.monday_lunch_to,
                                            tuesdayOpeningDoor: data.tuesday_opening_door ,
                                            tuesdayClosingDoor: data.tuesday_closing_door ,
                                            tuesdayLunchFrom: data.tuesday_lunch_from,
                                            tuesdayLunchTo: data.tuesday_lunch_to,
                                            wednesdayOpeningDoor: data.wednesday_opening_door,
                                            wednesdayClosingDoor: data.wednesday_closing_door ,
                                            wednesdayLunchFrom: data.wednesday_lunch_from,
                                            wednesdayLunchTo: data.wednesday_lunch_to,
                                            thursdayOpeningDoor: data.thursday_opening_door,
                                            thursdayClosingDoor: data.thursday_closing_door,
                                            thursdayLunchFrom: data.thursday_lunch_from,
                                            thursdayLunchTo: data.thursday_lunch_to,
                                            fridayOpeningDoor: data.friday_opening_door,
                                            fridayClosingDoor: data.friday_closing_door,
                                            fridayLunchFrom: data.friday_lunch_from,
                                            fridayLunchTo: data.friday_lunch_to,
                                            saturdayOpeningDoor: data.saturday_opening_door,
                                            saturdayClosingDoor: data.saturday_closing_door,
                                            saturdayLunchFrom: data.saturday_lunch_from,
                                            saturdayLunchTo: data.saturday_lunch_to,
                                            sundayOpeningDoor: data.sunday_opening_door ,
                                            sundayClosingDoor: data.sunday_closing_door ,
                                            sundayLunchFrom: data.sunday_lunch_from ,
                                            sundayLunchTo: data.sunday_lunch_to ,
                                            interval: data.interval,
                                            mondayFlag: data.monday_flag,
                                            mondaySchedule: data.monday_schedule,
                                            tuesdayFlag: data.tuesday_flag,
                                            tuesdaySchedule: data.tuesday_schedule,
                                            wednesdayFlag: data.wednesday_flag,
                                            wednesdaySchedule: data.wednesday_schedule,
                                            thursdayFlag: data.thursday_flag,
                                            thursdaySchedule: data.thursday_schedule,
                                            fridayFlag: data.friday_flag,
                                            fridaySchedule: data.friday_schedule ,
                                            saturdayFlag: data.saturday_flag ,
                                            saturdaySchedule: data.saturday_schedule,
                                            sundayFlag: data.sunday_flag ,
                                            sundaySchedule: data.sunday_schedule ,
                                            twentyFour: data.twenty_four ,
                                            homeService: data.home_service ,
                                            numberOfCustomersPerSchedule: data.number_of_customers_per_schedule,
                                            meta: finalMeta
                                        };
                                        response.statusCode = 200;
                                        response.body = JSON.stringify({
                                            message: 'New User Created',
                                            data: data,
                                            token: token
                                        });
                                        res.status(response.statusCode).send(response.body);
                                    })
                                }
                                else {
                                    data = {
                                        firstName: data.first_name,
                                        last_name: data.lastName,
                                        email: data.email,
                                        profileType: data.profile_type,
                                        cpf: data.cpf,
                                        dob: data.dob,
                                        gender: data.gender,
                                        mondayOpeningDoor: data.monday_opening_door,
                                        mondayClosingDoor: data.monday_closing_door,
                                        mondayLunchFrom: data.monday_lunch_from,
                                        mondayLunchTo: data.monday_lunch_to,
                                        tuesdayOpeningDoor: data.tuesday_opening_door ,
                                        tuesdayClosingDoor: data.tuesday_closing_door ,
                                        tuesdayLunchFrom: data.tuesday_lunch_from,
                                        tuesdayLunchTo: data.tuesday_lunch_to,
                                        wednesdayOpeningDoor: data.wednesday_opening_door,
                                        wednesdayClosingDoor: data.wednesday_closing_door ,
                                        wednesdayLunchFrom: data.wednesday_lunch_from,
                                        wednesdayLunchTo: data.wednesday_lunch_to,
                                        thursdayOpeningDoor: data.thursday_opening_door,
                                        thursdayClosingDoor: data.thursday_closing_door,
                                        thursdayLunchFrom: data.thursday_lunch_from,
                                        thursdayLunchTo: data.thursday_lunch_to,
                                        fridayOpeningDoor: data.friday_opening_door,
                                        fridayClosingDoor: data.friday_closing_door,
                                        fridayLunchFrom: data.friday_lunch_from,
                                        fridayLunchTo: data.friday_lunch_to,
                                        saturdayOpeningDoor: data.saturday_opening_door,
                                        saturdayClosingDoor: data.saturday_closing_door,
                                        saturdayLunchFrom: data.saturday_lunch_from,
                                        saturdayLunchTo: data.saturday_lunch_to,
                                        sundayOpeningDoor: data.sunday_opening_door ,
                                        sundayClosingDoor: data.sunday_closing_door ,
                                        sundayLunchFrom: data.sunday_lunch_from ,
                                        sundayLunchTo: data.sunday_lunch_to ,
                                        interval: data.interval,
                                        mondayFlag: data.monday_flag,
                                        mondaySchedule: data.monday_schedule,
                                        tuesdayFlag: data.tuesday_flag,
                                        tuesdaySchedule: data.tuesday_schedule,
                                        wednesdayFlag: data.wednesday_flag,
                                        wednesdaySchedule: data.wednesday_schedule,
                                        thursdayFlag: data.thursday_flag,
                                        thursdaySchedule: data.thursday_schedule,
                                        fridayFlag: data.friday_flag,
                                        fridaySchedule: data.friday_schedule ,
                                        saturdayFlag: data.saturday_flag ,
                                        saturdaySchedule: data.saturday_schedule,
                                        sundayFlag: data.sunday_flag ,
                                        sundaySchedule: data.sunday_schedule ,
                                        twentyFour: data.twenty_four ,
                                        homeService: data.home_service ,
                                        numberOfCustomersPerSchedule: data.number_of_customers_per_schedule,
                                        meta: finalMeta
                                    };
                                    response.statusCode = 200;
                                    response.body = JSON.stringify({
                                        message: 'New User Created',
                                        data: data,
                                        token: token
                                    });
                                    res.status(response.statusCode).send(response.body);
                                }
                            })
                                .catch(err=>{
                                    response.statusCode = 500;
                                    response.body = JSON.stringify({err});
                                    res.status(response.statusCode).send(response.body);
                                    res.status(response.statusCode).send(response.body);
                                });
                        }
                    });
            }
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
                    response.statusCode = 200;
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
                    response.statusCode = 200;
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
                                    email: user.email,
                                    firstName: user.firstName
                                }, config.jwt.secret, { expiresIn: '1y' })

                                // return json web token
                                response.statusCode = 200;
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