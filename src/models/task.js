const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    completed:{
        type:Boolean,
        default: false
       },
    role:{
        type:String,
        required: true
    },
}, {
    timestamps: true
})
const Task = new mongoose.model('task', taskSchema)
module.exports = Task