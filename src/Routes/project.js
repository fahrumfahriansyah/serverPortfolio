const express = require('express')
const route = express.Router()
const { body } = require('express-validator')
const Project = require("../Controllers/controlProject")

route.post("/CreateProject", [body("judul").isUppercase().withMessage("judul harus huruf besar").isLength({ min: 4 }).withMessage("judul minimal 4"), body("body").isLength({ min: 20, max: 120 }).withMessage("huruf minimal 20 maximal 120"), body("link").isURL().withMessage("ini bukan link")], Project.ProjectCreate)

route.get("/getAllProject", Project.getAllProject)
route.delete("/:byId", Project.deleteProjectByid)

module.exports = route