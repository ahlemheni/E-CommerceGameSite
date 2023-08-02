const express = require('express')
const router=express.Router()
const PaymentController = require("../Controllers/PaymentController")


router.post('/checkout/:CardId',PaymentController.checkout)
module.exports = router;