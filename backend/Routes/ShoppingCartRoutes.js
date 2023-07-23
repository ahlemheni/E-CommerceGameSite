const express = require('express')
const router=express.Router()
const GenreController = require("../Controllers/ShoppingCartController")

router.get('/cart/all',GenreController.get)
router.post('/cart/save',GenreController.save)
router.post('/cart/update',GenreController.update)
router.post('/cart/delete',GenreController.deleteAll)
router.post('/cart/:cartitem:/delete',GenreController.deleteOne)
router.get('/cart/:id/:username',GenreController.findone)
router.get('/cart/:username',GenreController.findmany)

