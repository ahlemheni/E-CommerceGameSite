const express = require('express')
const router=express.Router()
const ShoppingController = require("../Controllers/ShoppingCartController")

router.get('/cart/all',ShoppingController.get)
router.post('/cart/save',ShoppingController.save)
router.post('/cart/update',ShoppingController.update)
router.post('/cart/delete',ShoppingController.deleteAll)
router.post('/cart/deleteone',ShoppingController.deleteOne)
router.get('/cart/:id/:username',ShoppingController.findone)
router.get('/cart/user',ShoppingController.findmany)

module.exports = router;