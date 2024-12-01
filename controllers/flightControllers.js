const flight=require('../models/flight')
const bookSeat=require('../models/book')
const mongoose = require('mongoose');
const nodemailer = require('nodemailer');
exports.createFlight=async (req,res)=>{

  const {flight_number,airline,origin,destination,date,time,price,seats}=req.body;

  try{
    if (await flight.findOne({ flight_number })) {
        return res.status(400).json({ error: "Flight already exists" });
      }
    
      flight.create({flight_number,airline,origin,destination,date,time,price,seats})
      res.status(201).json({ message: "Flight registered successfully" });
  } catch(error){
    res.status(401).json({ message: "Server error", error });
  }
  
};

exports.getAllFlights = async (req, res) => {
    try {
      // Fetch all flights where seats are greater than 0
      const flights = await flight.find({ seats: { $gt: 0 } });
      res.status(200).json(flights); // Respond with the filtered data
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  

// In your flightController.js
exports.getAvailableFlights = async (req, res) => {
    
    const { from, to, date } = req.query;

    try {
      const flights = await flight.find({ 
        origin: from, 
        destination: to, 
        date: date 
      });
      console.log(flights)
      res.status(200).json(flights);
    } catch (error) {
      res.status(500).json({ message: "Server error", error });
    }
  };
  
  exports.getFlightDetails = async (req, res) => {
    
    const { id } = req.params;
    
    try {
        const Flight = await flight.findOne({ _id: id });
      if (!Flight) {
        return res.status(404).json({ message: 'Flight not found' });
      }
      res.status(200).json({ Flight });
    } catch (error) {
      res.status(500).json({ message: 'Error fetching flight details', error });
    }
  };

 exports.postBooking=async(req,res)=>{
    const {bookedSeats,userId,flight_number,id,name,email,phone,address,date,from,to,time}=req.body;
    
    bookSeat.create({bookedSeats,userId,flight_number,id,name,email,phone,address,date,from,to,time})
    res.json("Booking Done")

    const transporter = nodemailer.createTransport({
      service: 'Gmail', // Use your email service provider
      auth: {
        user: 'muntasirniloy2002@gmail.com', // Replace with your email
        pass: 'bxco evrw fwkp lokt', // Replace with your email password or app password
      },
    });

    // Email content
    const mailOptions = {
      from: 'muntasirniloy2002@gmail.com', // Sender email
      to: email, // Receiver email
      subject: 'Booking Confirmation',
      html: `
        <h1>Booking Confirmation</h1>
        <p>Dear ${name},</p>
        <p>Thank you for booking with us. Here are your booking details:</p>
        <ul>
          <li><strong>Flight Number:</strong> ${flight_number}</li>
          <li><strong>Date:</strong> ${date}</li>
          <li><strong>Time:</strong> ${time}</li>
          <li><strong>From:</strong> ${from}</li>
          <li><strong>To:</strong> ${to}</li>
          <li><strong>Seats:</strong> ${bookedSeats.join(', ')}</li>
        </ul>
        <p>We look forward to serving you.</p>
      `,
    };

    // Send the email
    await transporter.sendMail(mailOptions);

 };
  
exports.getBookings=async(req,res)=>{
   const {flight_number}=req.query

   try {
    const bookedSeat = await bookSeat.find({ 
     flight_number
    });
    res.status(200).json(bookedSeat);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
}

exports.updateFlight = async (req, res) => {
  
  const { flightId } = req.params; // Extract the booking ID from the request parameters
  const Flight = req.body; // Extract the updated data from the request body
  try {
    // Find the booking by ID and update it with the provided data
    const updatedFlight = await flight.findByIdAndUpdate(
      flightId,
      Flight,
      { new: true}, 
     // Return the updated document and validate the data
    );

    if (!updatedFlight) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({
      message: "Booking updated successfully",
      data: updatedFlight,
    });
  } catch (error) {
    console.error("Error updating booking:", error);
    res.status(500).json({
      message: "Failed to update booking",
      error: error.message,
    });
  }
};

exports.deleteFLight=async(req,res)=>{
  const {id}=req.params;

  try{
    const deletedFlight=await flight.findByIdAndDelete({_id:id})
  }catch(error){
    console.log("Deleted")
  }
}

  