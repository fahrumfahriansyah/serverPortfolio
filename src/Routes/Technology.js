const express = require('express')
const route = express.Router()
const { body } = require('express-validator')
const Technology = require("../Controllers/controlTechnology")

route.post("/CreateTech", [body("judul").isLength({ min: 4 }).withMessage("judul minimal 4 huruf"), body("link").isURL().withMessage("ini bukan link anda")], Technology.createTech)

route.get("/getAllTech", Technology.getAllTech)
module.exports = route

route.delete("/:byId", Technology.deleteTech)
