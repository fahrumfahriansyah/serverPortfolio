const mongoose = require("mongoose")
const Schema = mongoose.Schema({

    // image: {
    //     type: "string",
    //     required: true
    // },
    project: {
        type: Object,
        required: true
    },


}, {
    timestamps: true
})



module.exports = mongoose.model("Project", Schema)