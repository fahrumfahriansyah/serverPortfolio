const express = require('express')
const route = express.Router()
const { body } = require('express-validator')
const Auth = require("../Controllers/controlAuth")


route.post("/register", [body("fullName").isUppercase().withMessage("fullName harus huruf besar"), body("lastName").isUppercase().withMessage("lastName harus huruf besar"),
body("email").isEmail().withMessage("masukan email anda dengan benar"), body("password").isLength({ min: 9 }).withMessage("huruf password minimal 9 huruf")], Auth.AuthPost)

route.put("/:id", Auth.updateId)
route.post("/login", [body("email").isEmail().withMessage("masukan email anda"), body("password").isLength({ min: 9 }).withMessage("huruf minimal 9")], Auth.AuthLogin)
route.delete("/:id", Auth.deleteId)
route.delete("/", Auth.deleteAll)
route.get("/login/getLogin", Auth.getLogin)
route.get("/login/:id", Auth.getId)
module.exports = route

