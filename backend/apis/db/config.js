const mongoose = require('mongoose');

const connectmongo = async () => {
    try {
        const dbconnector = await mongoose.connect('mongodb://0.0.0.0:27017/unboxed')
        console.log("MongoDb connected successfully!");
    } catch (error) {
        console.log(error);

    }
}

module.exports = connectmongo;