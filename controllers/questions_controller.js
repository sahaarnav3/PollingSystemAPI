const Option = require('../models/options');
const Question = require('../models/questions');

module.exports.createQuestion = async (req, res) => {
    // console.log(req.body.keyOne, "port = ", process.env.PORT);
    let newQuestion = "";
    try {
        newQuestion = await Question.create(new Question({
            title: req.body.question
        }));
        // console.log(newQuestion);
    } catch(err) {
        console.log("This error occured in creating the Question :- ", err);
        if (err.code == 11000)
            return res.json({ 'Error': 'This Question Already Exists. Try Again With Another Question' });
    }
    res.json({ response: "Question Created", 'Question Id': newQuestion['_id'] });
}

module.exports.createOptions = async(req, res) => {
    // console.log("question id = ", req.params.id, " Option value = ", req.body.option );
    let newOption = "";
    let linkToVote = "";
    
    //let's first try to check if the question id given is even correct or not
    try {
        let questionExists = await Question.findById(req.params.id);
        if(!questionExists)
            return res.json({ response: "Question ID Given doesn't exists. Please try again with correct ID." });
    } catch (err) {
        console.log("This error occured while searching if Qustion exists --", err);
        return res.json({ response: "Some Problem With Question ID. Please try again with correct ID." });
    }

    //this is what will create the new option for a particular question.
    try {
        newOption = await Option.create(new Option({
            question_id: req.params.id,
            text: req.body.option,
            votes: 0,
            link_to_vote: null
        }));
        if(newOption){
            linkToVote = `http://localhost:${process.env.PORT}/options/${newOption._id}/add_vote`;
            newOption.link_to_vote = linkToVote;
            await newOption.save();
        }
    } catch(err) {
        console.log("This error occured in creating the Option :- ", err);
        if(err.code == 11000)
            return res.json({ response: "This option already exists. Please try again with noew option." });
        return res.json({ response: "Error Occured While Adding Option to DB. Please Try Again." });
    }
    return res.json({ response: "Option Added", link_to_vote: linkToVote });
}