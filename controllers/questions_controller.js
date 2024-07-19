
module.exports.createQuestion = (req, res) => {
    console.log(req.body.keyOne);
    res.json({ response: "Question Created" });
    // res.json(req.body);
}