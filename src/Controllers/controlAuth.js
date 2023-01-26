const { validationResult } = require('express-validator');
const { Error } = require('mongoose');
const Auth = require("../Models/Auth")
const ip = require('ip');
const { response } = require('express');
exports.AuthPost = (req, res, next) => {
    //! filter error
    const errors = validationResult(req);
    let emailErr;
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
            let arr = [{ msg: "email sudah ada ya" }]
            res.status(400).json({
                data: arr
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
    const update = { Admin: { loginTime: `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}-${today.getDate()}/${today.getMonth() + 1}/${today.getFullYear()}`, local: ip.address(), device: req.useragent, Access: false } };
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

exports.getLogin = (req, res, next) => {
    Auth.find({
        $and: [
            { 'Admin.loginTime': { $exists: true } },
            { 'Admin.Access': { $eq: false } }
        ]
    })
        .then(response => {
            res.status(200).json({
                message: "succes",
                response
            })
        }).catch(err => {
            console.log(err)
        })

}

exports.getId = (req, res, next) => {
    const id = req.params.id
    Auth.findById(id)
        .then(response => {
            res.status(200).json({
                message: "succes",
                response: response
            })
        })
}

exports.deleteId = (req, res, next) => {
    const id = req.params.id
    Auth.findByIdAndRemove(id)
        .then(response => {
            res.status(200).json({
                message: "success",
                response
            })
        })

}

exports.deleteAll = async (req, res, next) => {
    try {
        // Mencari data yang tidak memiliki properti 'Admin.loginTime'
        const data = await Auth.find({ 'Admin.loginTime': { $exists: false } });
        // Mendapatkan tanggal dan jam saat ini
        const now = new Date();
        const currentTime = now.toLocaleTimeString();
        const hour = currentTime.substring(0, 2);
        // akan menampilkan jam saja
        // Jika jam saat ini sama dengan jam yang ditentukan
        if (hour === "01") {
            // Looping setiap data yang ditemukan
            for (let i = 0; i < data.length; i++) {
                // Menghapus data dari database
                await Auth.findByIdAndDelete(data[i]._id);
            }
            res.status(200).json({
                message: `Successfully deleted ${data.length} data at ${hour} `
            });
        } else {
            res.status(200).json({
                message: `Deletion process not executed, current time is ${hour} `
            });
        }
    } catch (error) {
        res.status(500).json({
            message: `Error deleting data: ${error}`
        });
    }
}

exports.updateId = (req, res, next) => {
    const id = req.params.id
    Auth.findOneAndUpdate({ _id: id, "Admin.Access": false }, { $set: { 'Admin.Access': true } }, { new: false }, (err, doc) => {
        if (err) {
            console.log(err);
        } else {
            res.status(200).json({
                message: "success",
                doc
            });
        }
    });
}