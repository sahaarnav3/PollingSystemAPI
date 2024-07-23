const option = require('../models/options');
const question = require('../models/questions');

module.exports.createQuestion = (req, res) => {
    // console.log(req.body.keyOne, "port = ", process.env.PORT);
    console.log(req.body.question);

    res.json({ response: "Question Created" });
    // res.json(req.body);
}