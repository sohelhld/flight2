const mongoose = require('mongoose');
require('dotenv').config()

const connection = mongoose.connect(`mongodb+srv://sohel:nopass@cluster0.4rmgup6.mongodb.net/flight?retryWrites=true&w=majority`)
//mongodb://127.0.0.1:27017/Hotel
module.exports={
    connection
}