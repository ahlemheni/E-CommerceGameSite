const express = require('express')
const router=express.Router()
const ProductController = require("../Controllers/ProductController")

router.get('/products/all',ProductController.get)
router.post('/product/save',ProductController.save)
router.post('/product/update',ProductController.update)
router.post('/product/delete',ProductController.delete)
router.get('/product/:genreparam/:categoryparam/:id',ProductController.findone)

module.exports = router;