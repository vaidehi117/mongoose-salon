const express = require('express');
const router = express.Router();
//creating this controller module 
const salonsCtrl = require('../controllers/salons');

//Get /salons
router.get('/', salonsCtrl.index);
//GET /appointments/new
router.get('/new', salonsCtrl.new);
// GET /salons/:id (show functionality) MUST be below new route
router.get('/:id', salonsCtrl.show);
//Get Allapoinment page
router.get('/appointments', salonsCtrl.index);

//POST /salons
router.post('/', salonsCtrl.create);


module.exports = router;