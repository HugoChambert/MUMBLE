const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const cors = require('cors');

const User = require('./models/user.js');

const port = process.env.PORT || 3000;
const app = express();


//Middleware
app.use(cors());
app.use(express.json);

//NMTXdmsf3I7knfAr

// Connect to mongoDB 
const dbURI = 'mongodb+srv://Jrbenny10:NMTXdmsf3I7knfAr@mumblecluster.d2era1i.mongodb.net/MUMBLE_DATA?retryWrites=true&w=majority&appName=MUMBLECLUSTER';
mongoose.connect(dbURI)
    .then((result) => app.listen(port))
    .catch((err) => console.log(err));

app.get('/', (req, res) => {
    res.send('<h1>HELLO WORLD!</h1>');
});

app.get('/add-user', async (req, res) => {
    try {
        const { User, Pass } = req.body;

        const user = new User({ Username, Password });

        const savedUser = await user.save();
        res.status(201).json(savedUser);

    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});

app.get('/users', async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch(error) {
        res.status(500).json({ error: error.message });
    }
});
