
const { response } = require('express');
const { Error } = require('mongoose');
const Project = require("../Models/project")
exports.ProjectCreate = (req, res, next) => {
    const judul = req.body.judul
    const body = req.body.body
    const link = req.body.link

    const Posting = new Project({
        project: {
            judul,
            body,
            link,
        }
    })

    Posting.save().then(response => {
        res.status(200).json({
            message: "Create success",
            // image: "asd@gmail.com",
            Project: response

        })
    }).catch(err => {
        console.log(err)
    })

}