const mongoose = require("mongoose");



const flightSchema = new mongoose.Schema({
 flight_number:String,
 airline:String,
 origin:String,
 destination:String,
 date:String,
 time:String,
 price:String,
 seats:Number,

});

module.exports = mongoose.model("flights", flightSchema);