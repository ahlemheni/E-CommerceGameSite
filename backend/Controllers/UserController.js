const UserModel=require("../Models/UserModel")
const nodemailer = require('nodemailer');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { generatorOTP ,mailTransport,generateToken } = require('./utils/mail.js')
const verficationToken  = require('../Models/token.js')
const mongoose = require('mongoose');


module.exports.get= async(req,res)=>{
    const users= await UserModel.find()
    res.send(users)
       
}
module.exports.findOne = (req, res) => {
  UserModel.findById(req.params.userId)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "user not found with id " + req.params.userId
          });            
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "user not found with id " + req.params.userId
          });                
      }
      return res.status(500).send({
          message: "Error retrieving user with id " + req.params.userId
      });
  });
};

module.exports.save = async (req, res) => {
  const { username, email, phone_number, profileImage, password } = req.body;

  if (!username || !email || !password) {
    res.status(400).json({ message: 'Please provide all required fields.' });
    return;
  }

  bcrypt.hash(password, 10, (err, hashedPassword) => {
    if (err) {
      res.status(500).send({ message: 'Error occurred while encrypting the password.' });
      return;
    }

    const otp = generatorOTP();

    UserModel.create({
      username,
      email,
      phone_number,
      password: hashedPassword,
      role: { name: 'userRole' },
      profileImage,
      emailToken: otp,
    })
      .then((user) => {
        verficationToken.create({ owner: user._id, vtoken: otp }) // Create the verification token document with the user's _id as owner
          .then((token) => {
            console.log('Data added successfully to the database.');
            console.log(user);
            mailTransport().sendMail({
              from: 'chattichiheb35@gmail.com',
              to: email,
              subject: 'Account verification',
              html: `Please click the following link to verify your account ${otp}`,
            });
            res.send(user);
          })
          .catch((error) => {
            console.error('Error occurred while creating the verification token:', error);
            res.status(500).send({ message: 'An error occurred while creating the verification token.' });
          });
      })
      .catch((error) => {
        console.error('Error occurred while saving the user:', error);
        res.status(500).send({ message: 'An error occurred while saving the user.' });
      });
  });
};


module.exports.verify = async (req, res) => {
  const token = req.params.token;

  if (!token) {
    res.status(400);
    throw new Error('Invalid request');
  }

  const user = await UserModel.findOne({ emailToken: token }).exec();

  if (!user) {
    res.status(404);
    throw new Error('User Not Found!!');
  }

  if (user.verify) {
    res.status(400);
    throw new Error('User Already Verified!!');
  }

  if (!user.emailToken) {
    res.status(404);
    throw new Error('Invalid Token!!');
  }

  if (user.emailToken !== token) {
    res.status(400);
    throw new Error('Invalid Token!!');
  }
  user.emailToken = null;
  user.verified = true;

  await user.save();

  // Delete the verification token
  await verficationToken.findOneAndDelete({ owner: mongoose.Types.ObjectId.createFromHexString(user._id.toString()) });

  // Send verification success email
  mailTransport().sendMail({
    from: 'chattichiheb35@gmail.com',
    to: user.email,
    subject: 'Account Verified Successfully',
    html: `
      <td align="center">
        <h1 style="color: #AB7F42; text-align: center;">${user.username}, Your Account Is Verified</h1>
        <h3 style="color: #444444; font-size: 16px; text-align: justify;">Dear ${user.username},</p>
        <p>We are pleased to inform you that your account has been verified. You can now access all the features and services that we offer.</p>
        <p>If you have any questions or concerns, please don't hesitate to contact us.</p>
        <p>Best regards,</p>
        <h3 style="color: #444444; font-size: 16px; text-align: justify;">The gaming team Team</p>
      </td>
    `,
  });

  res.json(user);
};

    

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



const privateKey = 'SwiftCode';

module.exports.signIn = (req, res) => {
    const { username, email, password } = req.body;
  
    if ((!username && !email) || !password) {
      return res.status(400).json({
        error: true,
        message: "First name or email and password are required.",
      });
    }
  
    let query;
    if (username) {
      query = { username: username };
     } 
    else {
      query = { email: email };
     }
  
    UserModel
      .findOne(query)
      .then((user) => {
        if (!user) {
          return res.status(404).json({
            error: true,
            message: "User not found.",
          });
         } 
        else {
          if (!user.verified) {
            return res.status(400).json({
              error: true,
              status: "FAILED",
              message: "Email hasn't been verified.",
            });
          } 
          else {
            bcrypt.compare(password, user.password).then((same) => {
              if (same) {
                let token = jwt.sign({ id: user._id }, privateKey, {
                  expiresIn: '4h',
                });
                res.json({ token, user,msg:"sucessfully..." });
              } 
              else {
                return res.status(404).json({
                  error: true,
                  message: "Invalid password or email.",
                });
              }
            });
          }
        }
      })
      .catch((error) => {
        return res.status(500).json({
          error: true,
          message: "Internal server error.",
        });
      });
  };