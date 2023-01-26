const mongoose = require("mongoose")
const Schema = mongoose.Schema({

    email: {
        type: "string",
        required: true
    },
    password: {
        type: "string",
        required: true
    },
    name: {
        type: Object,
        required: true
    },
    Admin: {
        loginTime: {
            type: "string",
            required: false,
        },
        local: {
            type: "string",
            required: false,
        },
        device: {
            type: Object,
            required: false,
        }, Access: {
            type: Boolean,
            required: false,
        }
    },



}, {
    timestamps: true
})



module.exports = mongoose.model("Auth", Schema)