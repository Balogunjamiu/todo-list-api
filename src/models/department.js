const mongoose = require('mongoose');

   departmentSchema = new  mongoose.Schema({
     department:{
        type:String,
        required: true,
        unique:true
     },
     tasks:[{
              type: mongoose.Schema.Types.ObjectId,
              ref:'task'
     }],
}, {
  timestamps: true
});

const Department = new mongoose.model('department', departmentSchema);

 module.exports = Department