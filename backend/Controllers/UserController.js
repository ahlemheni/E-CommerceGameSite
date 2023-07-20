const UserModel=require("../Models/UserModel")
const nodemailer = require('nodemailer');
const bcrypt=require('bcrypt')
const jwt=require('jsonwebtoken');
const { generatorOTP ,mailTransport,generateToken } = require('./utils/mail.js')
const verficationToken  = require('../Models/token.js')
const mongoose = require('mongoose');
const { v4: uuidv4} =require('uuid');
const path = require('path');


module.exports.get= async(req,res)=>{
    const users= await UserModel.find()
    res.send(users)
       
}
module.exports.findOne = (req, res) => {
  const {  id } = req.params;

  UserModel.findById(id)
  .then(user => {
      if(!user) {
          return res.status(404).send({
              message: "user not found with id " + id
          });            
      }
      res.send(user);
  }).catch(err => {
      if(err.kind === 'ObjectId') {
          return res.status(404).send({
              message: "user not found with id " + id
          });                
      }
      return res.status(500).send({
          message: "Error retrieving user with id " + id
      })
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
    .then(data => {
      // res.send(data);
      sendVerificationEmail(data,res);
    }).catch(err => {
      res.status(500).send({
        message: err.message || "Some error occurred while creating the user."
      });
    });
});
};
const sendVerificationEmail =({_id , email,emailToken},res)=>{
  const currentUrl ="http://localhost:5000";
  const mailOptions ={
    from : 'chattichiheb35@gmail.com',
    to : email,
    subject:'verify your account ',
    html:`<h3>Hello, ${email}</h3><br/> <p>Please Verify your account .</p>
    <br/><p>Clik this link <a href=${currentUrl + "/verify/"+  _id + "/" +emailToken} >here</a>  .</p><br/>
    <p>This link expires in 6 hr .</p>`
  
  };
 
    const newVerification = new verficationToken({
      owner:_id,
      vtoken:emailToken,
      createdAt:Date.now(),
      expiresAt:Date.now()+21600000,
    });
    newVerification.save() 
    .then(()=>{
      mailTransport().sendMail(mailOptions)
      .then(()=>{
        res.json({
          status :"PENDING"
        })
        console.log('Verified' );

      })
      .catch((error)=>{
        console.log('Error Sending Mail:',error );
      })
          
    }
    )
    .catch((error)=> {
      console.log("Error in sending verification Email",error);
    })
       

  .catch(()=>{
    res.status(500).send({
      message: err.message || "Some error occurred while ."
  });
  })
}
module.exports.verify = (req, res) => {
  let { owner, vtoken } = req.params;
  verficationToken
    .find({ owner })
    .then((result) => {
      if (result.length > 0) {
        const { expiresAt } = result[0];
        const hasheduniqueString = result[0].vtoken;

        if (expiresAt < Date.now()) {
          verficationToken
            .deleteOne({ owner })
            .then(result => {
              UserModel.deleteOne({ _id: owner })
                .then(() => {
                  let message = "Link has expired. Please sign up again";
                  res.redirect(`/verified?error=true&message=${message}`);
                })
                .catch((error) => {
                  let message =
                    "Account record doesn't exist or has been verified already";
                  res.redirect(`/verified?error=true&message=${message}`);
                });
            })
            .catch((error) => {
              console.log("Error deleting the user", error);

              let message =
                "An error occurred while clearing expired user verification record";
              res.redirect(`/verified?error=true&message=${message}`);
            });
        } else {
          bcrypt
            .compare(vtoken, hasheduniqueString)
            .then((result) => {
              if (result) {
                UserModel.updateOne({ _id: owner }, { verified: true })
                  .then(() => {
                    verficationToken
                      .deleteOne({ owner })
                      .then(() => {
                        res.sendFile(
                          path.join(__dirname, "../Models/verified.html")
                        );
                      })
                      .catch((error) => {
                        console.log("Error updating account", error);
                      });
                  })
                  .catch((error) => {
                    console.log("Error updating account", error);
                  });
              } else {
                let message = "Invalid verification details passed";
                res.redirect(`/verified?error=true&message=${message}`);
              }
            })
            .catch((error) => {
              let message = "An error occurred while comparing uniqueString";
              res.redirect(`/verified?error=true&message=${message}`);
            });
        }
      } else {
        let message = "Account  has been verified already";
        res.redirect(`/verified?error=true&message=${message}`);
      }
    })
    .catch((error) => {
      let message = "An error occurred while finding verification token";
      res.redirect(`/verified?error=true&message=${message}`);
    });
};


 module.exports.verified= (req, res) => {

  const filePath = path.join(__dirname, '../Models/verified.html');
  res.sendFile(filePath);
  
 }
     

module.exports.update = (req, res) => {
  const { id } = req.params;


  // Find user and update it with the request body
  UserModel.findById(id)
    .then(user => {
      if (!user) {
        return res.status(404).send({
          message: "User not found with id " + id
        });
      }

      // Update user fields
      user.username = req.body.username;
      user.phone_number = req.body.phone_number;
      user.profileImage = req.body.profileImage;

      // If password is provided and changed, encrypt it with bcrypt
      if (req.body.password && req.body.password !== user.password) {
        bcrypt.hash(req.body.password, 10, (err, hashedPassword) => {
          if (err) {
            return res.status(500).send({
              message: "Error occurred while encrypting the password."
            });
          }
          user.password = hashedPassword;

          // Save the updated user
          user.save()
            .then(updatedUser => {
              res.send(updatedUser);
            })
            .catch(err => {
              res.status(500).send({
                message: "Error updating user with id " + req.params.id
              });
            });
        });
      } else {
        // Save the updated user without changing the password
        user.save()
          .then(updatedUser => {
            res.send(updatedUser);
          })
          .catch(err => {
            res.status(500).send({
              message: "Error updating user with id " + req.params.id
            });
          });
      }
    })
    .catch(err => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: "User not found with id " + req.params.id
        });
      }
      return res.status(500).send({
        message: "Error retrieving user with id " + req.params.id
      });
    });
};
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
const sessions = {};

module.exports.signIn = (req, res) => {
  const sessionId = uuidv4();
  const { username, email, password } = req.body;

  if ((!username && !email) || !password) {
    return res.status(400).json({
      error: true,
      message: "Username or email and password are required.",
    });
  }

  let query;
  if (username) {
    query = { username: username };
  } else {
    query = { email: email };
  }

  UserModel.findOne(query)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          error: true,
          message: "User not found.",
        });
      } else {
        if (!user.verified) {
          return res.status(400).json({
            error: true,
            status: "FAILED",
            message: "Email hasn't been verified.",
          });
        } else {
          bcrypt.compare(password, user.password)
            .then((same) => {
              if (same) {
                const token = jwt.sign({ id: user._id }, privateKey, {
                  expiresIn: '4h',
                });
                sessions[sessionId] = { user, userId: user._id };
                res.cookie('session', sessionId, { httpOnly: true });
                console.log(sessionId);

                res.json({ token, user,sessionId, msg: "Successfully signed in." });
              } else {
                return res.status(401).json({
                  error: true,
                  message: "Invalid password or email.",
                });
              }
            })
            .catch((error) => {
              console.error('Error occurred while comparing passwords:', error);
              res.status(500).json({
                error: true,
                message: "Internal server error.",
              });
            });
        }
      }
    })
    .catch((error) => {
      console.error('Error occurred while signing in:', error);
      res.status(500).json({
        error: true,
        message: "Internal server error.",
      });
    });
};




const generateRandomPassword = () => {
  const characters =
    'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let password = '';
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    password += characters.charAt(randomIndex);
  }
  return password;
};

module.exports.ResetPassword = (req, res) => {
  const { email } = req.body;
  
  UserModel.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.json({
          status: "FAILED",
          message: "Email not found",
        });
      }

      if (!user.verified) {
        return res.json({
          status: "FAILED",
          message: "Email hasn't been verified.",
        });
      }

      const newPassword = generateRandomPassword();

      bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
        if (err) {
          res.json({
            status: "FAILED",
            message: "Error occurred while generating new password.",
          });
        } else {
          UserModel.findByIdAndUpdate(user._id, { password: hashedPassword })
            .then(() => {
                  sendResetEmail(user, newPassword, res);
            })
            .catch(() => {
              res.json({
                status: "FAILED",
                message: "Error occurred while updating user's password.",
              });
            });
        }
      });
    })
    .catch(() => {
      res.json({
        status: "FAILED",
        message: "Error occurred while checking for existing user.",
      });
    });
};

const sendResetEmail = ({ email }, newPassword, res) => {
  const mailOptions = {
    from: 'chattichiheb35@gmail.com',
    to: email,
    subject: 'Reset Password',
    html: `<h3>Hello, ${email}</h3><br/><p>Your new password is: ${newPassword}</p>`,
  };

  mailTransport().sendMail(mailOptions, (error, info) => {
    if (error) {
      res.json({
        status: "FAILED",
        message: "Error occurred while sending reset email.",
      });
    } else {
      // Email sent successfully
      res.json({
        status: "SUCCESS",
        message: "Reset email sent successfully.",
      });
    }
  });
};
