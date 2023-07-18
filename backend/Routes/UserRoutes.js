const express = require('express')
const router=express.Router()
const UserController = require("../Controllers/UserController")

router.get('/',UserController.get)
router.get('/:userId', UserController.findOne);

router.post('/save',UserController.save)
router.post('/update',UserController.update)
router.post('/delete',UserController.delete)
router.post('/verify/:token',UserController.verify)
router.post('/signIn',UserController.signIn)

module.exports = router;