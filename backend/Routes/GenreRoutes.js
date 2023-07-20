const express = require('express')
const router=express.Router()
const GenreController = require("../Controllers/GenreController")

router.get('/genre/all',GenreController.get)
router.post('/genre/save',GenreController.save)
router.post('/genre/update',GenreController.update)
router.post('/genre/delete',GenreController.delete)
router.get('/genre/:name/:id',GenreController.findone)

module.exports = router;