const { validationResult } = require('express-validator');
const { Error } = require('mongoose');
const Technology = require("../Models/Technology")
const path = require("path")
const fs = require("fs")
exports.createTech = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        const err = new Error("input value tidak sesuai")
        err.errorStatus = 400
        if (!req.file) {
            let dat = errors.array()
            dat.push({ msg: "image tidak ada" })
            const data = { notValid: dat }
            err.data = data
        } else {
            const image = req.file.path
            removeImage(image)
            const data = { notValid: errors.array() }
            err.data = data
            throw err
        }
        throw err
    }

    if (errors.isEmpty()) {
        if (!req.file) {
            const err = new Error("input value tidak sesuai")
            err.errorStatus = 400
            let dat = errors.array()
            dat.push({ msg: "image tidak ada" })
            const data = { notValid: dat }
            err.data = data
            throw err
        }
    }
    const image = req.file.path
    const judul = req.body.judul
    const link = req.body.link
    const bgc = req.body.bgc

    const Posting = new Technology({
        image,
        Technology: {
            judul,
            link,
            bgc
        }
    })
    Posting.save().then(response => {
        res.status(200).json({
            message: "Create success",
            Technology: response
        })
    }).catch(err => {
        removeImage()
        console.log(err)
    })

}

exports.getAllTech = (req, res, next) => {
    Technology.find()
        .then(response => {
            res.status(200).json({
                message: "get All succes",
                Technology: response
            })
        }).catch(err => {
            console.log(err)
        })
}

exports.deleteTech = (req, res, next) => {
    const params = req.params.byId.toString().trim()
    Technology.findByIdAndDelete(params).then(response => {
        removeImage(response.image)
        res.json({
            message: "success full"
        })
    }).catch(err => {
        res.json({
            message: "error"
        })
    })
}

removeImage = (filePathImg) => {
    filePathImg = path.join(__dirname, "../..", filePathImg)
    console.log(filePathImg)
    fs.unlink(filePathImg, err => console.log(err))
}