const mongoose = require('mongoose');
const RoleSchema = new mongoose.Schema({

    name : {type : String , required : true , default : "userRole"}
})

const UserSchema = mongoose.Schema({
  username: {
    type: String,
    unique: [true, 'The first name is unique'],
  },
  email: {
    type : String , 
    required:true, 
    unique: true},
  
  phone_number: {
    type: String
  },
  Password: String,
  profileImage:  String,
  Verified :Boolean,
  role :RoleSchema,
}, {
  timestamps: true,
});

module.exports = mongoose.model('User', UserSchema);