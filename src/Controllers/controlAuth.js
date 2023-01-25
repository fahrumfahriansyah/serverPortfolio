const { validationResult } = require('express-validator');
const { Error } = require('mongoose');
const Auth = require("../Models/Auth")
const ip = require('ip');
exports.AuthPost = (req, res, next) => {
    //! filter error
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error("input value tidak sesuai")
        err.errorStatus = 400
        err.data = errors.array()
        throw err
    }
    const email = req.body.email
    const password = req.body.password
    const fullName = req.body.fullName
    const lastName = req.body.lastName
    //! create login

    Auth.findOne({ email: email }, function (err, doc) {

        if (!doc) {
            const Posting = new Auth({
                email: email,
                password: password,
                name: { fullName: fullName, lastName: lastName }
            })
            Posting.save().then(result => {
                res.status(200).json({
                    message: "create login succes",
                    data: result
                })
            }).catch(err => {
                console.log("error", err)
            })
        } else {
            res.status(400).json({
                message: "email sudah ada"
            })
        }
    })



}

exports.AuthLogin = (req, res, next) => {


    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error("input value tidak sesuai")
        err.errorStatus = 400
        err.data = errors.array()
        throw err

    }


    const email = req.body.email
    const password = req.body.password
    const query = { email: email, password: password }
    const today = new Date()
    const update = { Admin: { loginTime: `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}-${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`, local: ip.address(), device: req.useragent } };
    Auth.findOneAndUpdate(query, update, { new: true }, function (err, doc) {
        if (!doc) {

            res.json({
                message: false,
            })
        } else {

            res.json({
                message: true,
                data: doc
            })
        }

    })
}

