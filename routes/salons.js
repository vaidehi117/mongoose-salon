const express = require('express');
const router = express.Router();
//creating this controller module 
const salonsCtrl = require('../controllers/salons');

//Get /salons
router.get('/', salonsCtrl.index);
//GET /appointments/new
router.get('/new', salonsCtrl.new);
//POST /salons
router.post('/', salonsCtrl.create);


module.exports = router;