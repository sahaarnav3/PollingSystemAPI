const express = require('express');
const router = express.Router();

const systemController = require('../controllers/system_controller');

console.log('Router Loaded');

router.get('/home', (req, res) => {
    res.send("Working...");
})

router.post('/questions/create', systemController.createQuestion);

router.post('/questions/:id/options/create', systemController.createOptions);

//Below router is used to delete a question.
router.post('/questions/:id/delete', systemController.deleteQuestion);

router.get('/options/:id/add_vote', systemController.addVote);

//Below router is used to delete an option.
router.post('/options/:id/delete', systemController.deleteOption);

module.exports = router;