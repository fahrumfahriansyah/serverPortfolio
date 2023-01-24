const { validationResult } = require('express-validator');
const { response } = require('express');
const { Error } = require('mongoose');
const Project = require("../Models/project");
const project = require('../Models/project');
exports.ProjectCreate = (req, res, next) => {
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
    const body = req.body.body
    const link = req.body.link

    const Posting = new Project({
        image,
        project: {
            judul,
            body,
            link,
        }
    })

    Posting.save().then(response => {
        res.status(200).json({
            message: "Create success",
            Project: response

        })
    }).catch(err => {
        console.log(err)
    })

}

exports.getAllProject = (req, res, next) => {
    const currentPage = req.query.page || 1
    const toPage = req.query.toPage || 3
    let totalAllData;
    project.find().countDocuments()
        .then((result) => {
            totalAllData = result
            return Project.find().skip((parseInt(currentPage) - 1) * parseInt(toPage))
                .limit(toPage)
        }).then((result) => {
            let pageNum = Math.floor(totalAllData / 3) + 1
            res.status(200).json({
                message: "get all data project",
                data: result,
                totalProject: totalAllData,
                pageNum,
                toPage: toPage,
                page: currentPage
            })
        }).catch((err) => {
            next(err)
        })

}


exports.deleteProjectByid = (req, res, next) => {
    const params = req.params.byId.toString().trim()

    project.findByIdAndDelete(params).then(response => {
        res.json({
            message: "success full"
        })
    }).catch(err => {
        res.json({
            message: "error"
        })
    })
}