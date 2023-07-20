const express = require('express')
const router=express.Router()
const UserController = require("../Controllers/UserController")

router.get('/',UserController.get)
router.get('/users/:id', UserController.findOne);

router.post('/save',UserController.save)
router.put('/update/:id', UserController.update);
router.post('/delete',UserController.delete)
router.get('/verify/:owner/:vtoken',UserController.verify);

router.get('/verified',UserController.verified);
router.post('/signIn',UserController.signIn)
router.post('/ResetPassword', UserController.ResetPassword);

module.exports = router;