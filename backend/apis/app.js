const express = require("express");
const cors = require("cors");
const mongodbconnection = require('./db/config')
const User = require('./db/model/userModel')

const userRouter = require('./router/userRouter')
const { spawn } = require('child_process');
const searchRoutes = require('./router/searchRoutes');


const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();


const PORT = process.env.PORT || 3001

// Connect to MongoDB
mongodbconnection();


app.use('/api', userRouter)
app.use('/api/search', searchRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something broke!');
});







app.listen(PORT, () => {
    console.log(`Service is running at ${PORT}`);
})

