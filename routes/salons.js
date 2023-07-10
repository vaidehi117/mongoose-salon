const express = require('express');
const router = express.Router();
//creating this controller module 
const salonsCtrl = require('../controllers/salons');

//Get /Routers
router.get('/', salonsCtrl.index);

module.exports = router;