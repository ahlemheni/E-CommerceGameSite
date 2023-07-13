const UserModel=require("../Models/UserModel")
const nodemailer = require('nodemailer');
const bcrypt=require('bcrypt')

const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'chattichiheb35@gmail.com',
      pass: 'ejgjzihlqtctemup'
    }
  });

module.exports.get= async(req,res)=>{
    const users= await UserModel.find()
    res.send(users)
       
}

module.exports.save= async(req,res)=>{
    bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
        if (err) {
          res.status(500).send({
            message: "Error occurred while encrypting the password."
          });
          return;
        }
   
    const {username,email,phone_number,profileImage}=req.body
    const password=hashedPassword

        
    let mailOptions = {
        from: `chattichiheb35@gmail.com`, 
        to: email, 
        subject: 'Account verification', 
        text: `Please click the following link to verify your account :` 
      };
 
    UserModel
        .create({username,email,phone_number,password,role: {name: "userRole"},profileImage})
        .then((data)=>{
            console.log("Data added sucessfully to the database....")
            console.log(data)
            transporter.sendMail(mailOptions,(err,info)=>{
                if (err){
                    console.log('an error has occured while sending the mail')
                }
                else {
                    console.log(`Email has been sent ${info}`)
                }
            })
            res.send(data)
        })})
    }
    

module.exports.update= async(req,res)=>{
    const {_id,username,phone_number,password,profileImage}= req.body
    UserModel
        .findByIdAndUpdate(_id,{username,phone_number,password,profileImage})
        .then(()=>{res.send("Updated sucessfully...")})
        .catch((err)=>{
            console.log(`Error while updating info concerning  ${username} :${err}`)
        })
                }
module.exports.delete= async(req,res)=>{
    const {_id,username} = req.body
    UserModel
        .findByIdAndDelete(_id)
        .then(()=>{res.status(201).send("Account deleted sucessfully...")})
        .catch((err)=>{
            console.log(`Error while deleting ${username}'s account :${err}`)
        })
                } 
module.exports.verify= async(req,res)=>{
       
                }