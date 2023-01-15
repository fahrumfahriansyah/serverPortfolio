const express = require('express')
const route = express.Router()
const Project = require("../Controllers/project")

route.post("/CreateProject", Project.ProjectCreate)

module.exports = route