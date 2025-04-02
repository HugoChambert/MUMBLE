const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const port = process.env.PORT || 8000;


const app = express();

// Connect to mongoDB 
const dbURI = 'mongodb+srv://Jrbenny10:NMTXdmsf3I7knfAr@mumblecluster.d2era1i.mongodb.net/MUMBLE_DATA';
mongoose.connect(dbURI)
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('<h1>HELLO WORLD!</h1>');
});
