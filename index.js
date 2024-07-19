const express = require('express');
const app = express();

const db = require('./config/mongoose');

app.use(express.urlencoded({ extended: false }));

// using express router
app.use('/', require('./routes'));

const listener = app.listen(process.env.PORT || 3000, (err) => {
    if(err)
        console.log(`Error in running the server: ${err}`);
    console.log('Your app is listening on port: ' + listener.address().port);
});