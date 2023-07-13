const express = require('express');
const router = express.Router();
//creating this controller module 
const salonsCtrl = require('../controllers/salons');

//Get /salons
router.get('/', salonsCtrl.home);

//GET /appointments/new
router.get('/new', salonsCtrl.new);

//Get /appointment/new Update
router.put('/new', salonsCtrl.updateAppointment);

// Get Allapoinment page
router.get('/appointments', salonsCtrl.appointments);

// GET /salons/:id (show functionality) MUST be below new route
router.get('/:id', salonsCtrl.show);


//POST /salons
router.post('/', salonsCtrl.create);


module.exports = router;