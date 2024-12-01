const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
    flight_number:String,
    bookedSeats: Array,
    userId:String,
    name:String,
    email:String,
    phone:String,
    address:String,
    date:String,
    from:String,
    to:String,
    time:String
});

module.exports = mongoose.model("books", bookSchema);