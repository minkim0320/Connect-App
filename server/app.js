const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();

const postinfo = require('./routes/api/postinfo');

// Bodyparser
app.use(bodyParser.json());

// DB Config
const dbURI = require('../config/keys').mongoURI;

// Connect to MongoDB
mongoose
    .connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log("MongoDB connected"))
    .catch(err => console.log(err));

// Use Routes
app.use('/api/postinfo', postinfo);

const postinfoModel = require('./models/PostInfo');

app.use(express.static(__dirname + '\\..\\public'))

const PORT = process.env.PORT || 3000; 

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
