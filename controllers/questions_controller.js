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