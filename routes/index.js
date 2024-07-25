const express = require('express');
const router = express.Router();

const questionController = require('../controllers/questions_controller');

console.log('Router Loaded');

router.get('/home', (req, res) => {
    res.send("Working...");
})

router.post('/questions/create', questionController.createQuestion);
router.post('/questions/:id/options/create', questionController.createOptions);




module.exports = router;