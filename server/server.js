require('dotenv').config()

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const playerRoutes =  require('./routes/players')
const tournamentRoutes = require('./routes/tournaments')

const app = express();

// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/players', playerRoutes);
app.use('/api/tournaments', tournamentRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        // listen for requests
    app.listen(process.env.PORT, () => {
    console.log("Connected to db & listening on port", process.env.PORT);
});
    })
    .catch(err => console.error('Could not connect to MongoDB...', err));

