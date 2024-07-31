// This is the main controller file which has the logic/code for all the controller functions.

const Option = require('../models/options');
const Question = require('../models/questions');

//Below Controller is used to create a new question.
module.exports.createQuestion = async (req, res) => {
    // console.log(req.body.keyOne, "port = ", process.env.PORT);
    let newQuestion = "";
    try {
        newQuestion = await Question.create(new Question({
            title: req.body.question
        }));
        // console.log(newQuestion);
    } catch (err) {
        console.log("This error occured in creating the Question :- ", err);
        if (err.code == 11000)
            return res.json({ 'Error': 'This Question Already Exists. Try Again With Another Question' });
    }
    res.json({ response: "Question Created", 'Question Id': newQuestion['_id'] });
}

//Below Controller is used to create options for a particular question
module.exports.createOptions = async (req, res) => {
    // console.log("question id = ", req.params.id, " Option value = ", req.body.option );
    let newOption = "";
    let linkToVote = "";

    //let's first try to check if the question id given is even correct or not
    try {
        let questionExists = await Question.findById(req.params.id);
        if (!questionExists)
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
        if (newOption) {
            linkToVote = `http://localhost:${process.env.PORT}/options/${newOption._id}/add_vote`;
            newOption.link_to_vote = linkToVote;
            await newOption.save();
        }
    } catch (err) {
        console.log("This error occured in creating the Option :- ", err);
        if (err.code == 11000)
            return res.json({ response: "This option already exists. Please try again with new option." });
        return res.json({ response: "Error Occured While Adding Option to DB. Please Try Again." });
    }
    return res.json({ response: "Option Added", link_to_vote: linkToVote });
}

//Below Controller is used to delete a question.(Only if all the options to that qeustion has zero votes)
module.exports.deleteQuestion = async (req, res) => {
    let questionId = req.params.id;
    let results = '';
    try {
        results = await Option.find({
            question_id: questionId,
            votes: { $gte: 1 } //filter options having votes greater than or equal to 1.
        });
    } catch (err) {
        console.log("This Error is occuring while fetching votes from DB", err);
        return res.json({ response: 'Some Error occured while fetching and deleting data from DB. Please try again' });
    }
    if (results.length > 0)
        return res.json({ Response: "Question can't be deleted since One or More of it's options has 1 or more than 1 votes" });
    try {
        await Question.findByIdAndDelete(questionId);
        await Option.deleteMany({ question_id: questionId });
        return res.json({ Response: "Question Deleted Successfully." });
    } catch (err) {
        console.log("This error occured while deleting the options from Option Collection (with a particular question_id)", err);
    }
    return res.json({ Response: "Some error occured. Please try again" });
}

//Below Controller is used to delete a particular option(Only if has zero votes to it.)
module.exports.deleteOption = async (req, res) => {
    let optionId = req.params.id;
    let result = "";
    try {
        result = await Option.findById(optionId);
        if (result.votes > 0)
            return res.json({ Response: "This option can't be deleted since it has greater than equal to 1 vote." });
        else {
            await Option.findByIdAndDelete(optionId);
            return res.json({ Response: "Option Deleted Successfully." });
        }
    } catch (err) {
        console.log("This error occured while fetching option from DB (For deleting option controller) -", err);
        return res.json({ Response: "The ID given doesn't exists. Please try again with correct ID." });
    }
    return res.json({ Response: "Some error occured while deleting option. Please try again." });
}

//Below Controller is used to add vote count for a particular option.
module.exports.addVote = async (req, res) => {
    let optionId = req.params.id;
    try {
        let optionDetails = await Option.findById(optionId);
        optionDetails.votes += 1;
        await optionDetails.save();
        return res.json({ response: 'Vote count Successfully Increased.', "Vote Count": optionDetails.votes });
    } catch (err) {
        console.log("This error occured while increasing vote count = ", err);
    }
    return res.json({ response: "Given Option ID Not Found. Please Try Again With Correct ID." });
}

//Below Controller is used to see everything related to a question and it's options.
module.exports.viewDetails = async (req, res) => {
    let questionId = req.params.id;
    let questionResponse = "";
    let optionResponse = "";
    try {
        questionResponse = await Question.findById(questionId);
        optionResponse = await Option.find({
            question_id: questionId
        }, {
            _id : 1,
            text : 1,
            votes : 1,
            link_to_vote : 1
        });
        let finalResponse = {
            id: questionId,
            title: questionResponse.title,
            options: optionResponse
        }
        return res.json(finalResponse);
    } catch (err) {
        console.log("This error occured while fetching details of both Question & Option.-", err);
        return res.json({ Response: "Some problem with the Question ID. Please Try again." });
    }
}