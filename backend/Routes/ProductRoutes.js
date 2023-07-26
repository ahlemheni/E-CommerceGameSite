const express = require('express')
const router=express.Router()
const ProductController = require("../Controllers/ProductController")

router.get('/products/all',ProductController.get)
router.post('/product/save',ProductController.save)
router.post('/product/update',ProductController.update)
router.post('/product/delete',ProductController.delete)
router.get('/product/one',ProductController.findone)

module.exports = router;