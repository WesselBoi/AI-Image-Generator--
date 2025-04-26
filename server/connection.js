const mongoose = require('mongoose');

async function connectToMongoDb(url){
    mongoose.set('strictQuery', true);

    return mongoose.connect(url)
}

module.exports = connectToMongoDb;