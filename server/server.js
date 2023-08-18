require('dotenv').config()

const express = require('express');
const playerRoutes =  require('./routes/players.ts')

const app = express();

// middleware
app.use(express.json());
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// routes
app.use('/api/players', playerRoutes);

// listen for requests
app.listen(process.env.PORT, () => {
    console.log("Server is listening on port", process.env.PORT);
});