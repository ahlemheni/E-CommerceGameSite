const express = require('express')
const router=express.Router()
const OrderController = require("../Controllers/OrderController")

router.get('/Order/all',OrderController.get)
router.post('/Order/save',OrderController.save)
router.post('/Order/update',OrderController.update)
router.post('/Order/delete',OrderController.delete)
router.get('/Order/:orderby/:id',OrderController.findone)
router.get('/Order/:orderby',OrderController.findmany)



module.exports = router;