const express = require('express');
const router = express.Router();

//Main controller file for the Application.
const systemController = require('../controllers/system_controller');

console.log('Router Loaded');

//This router is used for creating a new question.
router.post('/questions/create', systemController.createQuestion);
//This router is used to create options for a particular question(which can be given with the id number.)
router.post('/questions/:id/options/create', systemController.createOptions);
//Below router is used to delete a question.
router.post('/questions/:id/delete', systemController.deleteQuestion);
//Below Router is used to fetch details of question with it's id along with all the options.
router.get('/questions/:id', systemController.viewDetails);


//This Router is used to increase vote count for a particular option.
router.get('/options/:id/add_vote', systemController.addVote);
//Below router is used to delete an option.
router.post('/options/:id/delete', systemController.deleteOption);

module.exports = router;