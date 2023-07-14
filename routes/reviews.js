const express = require('express');
const router = express.Router();

const reviewsCtrl = require('../controllers/reviews');

router.post('/salons/:id/reviews', reviewsCtrl.create);

router.put('/reviews/:id', reviewsCtrl.update);

router.delete('/reviews/:id', reviewsCtrl.delete);



// router.get('/salons/reviews/:id', reviewsCtrl.edit);

module.exports = router;