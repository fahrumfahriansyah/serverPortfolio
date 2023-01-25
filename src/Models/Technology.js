const mongoose = require("mongoose")
const Schema = mongoose.Schema({

    image: {
        type: "string",
        required: true
    },
    Technology: {
        type: Object,
        required: true
    },


}, {
    timestamps: true
})

module.exports = mongoose.model("Technology", Schema)