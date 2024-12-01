const user=require('../models/user')
const booking=require('../models/book')

exports.user=async(req,res)=>{
    const {id}=req.params;
    try{
        const User=await user.find({_id:id})
        res.json(User)
    }catch(error){
        console.log("No User Found")
    }
};

exports.updateUserData = async (req, res) => {
  
    // Extract user ID from params or JWT (depending on your auth strategy)
    const { id } = req.params;
    const { name, email, phone } = req.body;
  
    try {
      // Find the user by their ID and update the data
      const updatedUser = await user.findByIdAndUpdate(
        {_id:id}, // Find user by ID
        { name, email, phone }, // Fields to update
        { new: true } // Return the updated user data
      );
  
      // If user not found
      if (!updatedUser) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      // Return the updated user
      res.json({
        message: 'Profile updated successfully',
        data: updatedUser,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error', error });
    }
  };

  exports.userBookings=async(req,res)=>{
     const {id}=req.params;
    
     try{
        const book=await booking.find({userId:id})
        res.json(book)
     }catch(error){
        console.log(error)
     }
  }

  exports.deleteBooking=async(req,res)=>{
    const {bookingId}=req.params
    
    try{
        await booking.findByIdAndDelete({_id:bookingId})
    }catch(error){
        console.log("Error deleting data")
    }
  }


  exports.updateBooking = async (req, res) => {
    const { bookingId } = req.params; // Extract the booking ID from the request parameters
    const book = req.body; // Extract the updated data from the request body
    try {
      // Find the booking by ID and update it with the provided data
      const updatedBooking = await booking.findByIdAndUpdate(
        bookingId,
        book,
        { new: true}, 
       // Return the updated document and validate the data
      );
  
      if (!updatedBooking) {
        return res.status(404).json({ message: "Booking not found" });
      }
  
      res.status(200).json({
        message: "Booking updated successfully",
        data: updatedBooking,
      });
    } catch (error) {
      console.error("Error updating booking:", error);
      res.status(500).json({
        message: "Failed to update booking",
        error: error.message,
      });
    }
  };


  exports.allBooking=async(req,res)=>{
    try{
        const book=await booking.find()
        res.json(book)
    }
    catch(error){
        console.log("Error fetching data")
    }
  }

  exports.removeBooking = async (req, res) => {
    const { flightId } = req.params; // Ensure `flightId` is correctly received
    console.log("Flight ID to delete bookings for:", flightId);
  
    try {
      // Use `await` to wait for the delete operation to complete
      const deleted = await booking.deleteMany({ flight_number: flightId });
  
      if (deleted.deletedCount > 0) {
        res.status(200).json({ message: "Bookings deleted successfully." });
      } else {
        res.status(404).json({ message: "No bookings found for the given flight ID." });
      }
    } catch (error) {
      console.error("Error deleting bookings:", error);
      res.status(500).json({ message: "Failed to delete bookings.", error });
    }
  };
  


  exports.updateBookingDetails = async (req, res) => {
    const { flightId } = req.params; // Flight booking ID from URL parameters
    const flight_number = flightId; // Flight number to match
    const { date, time } = req.body; // New data to update
  
    
  
    try {
      // Update all bookings that match the flight_number
      const updateResult = await booking.updateMany(
        { flight_number }, // Match flight_number
        { $set: { date, time } } // Fields to update
      );
  
  
      if (updateResult.matchedCount === 0) {
        return res.status(404).json({ message: "No bookings found for this flight number" });
      }
  
      // Successfully updated, send a success response
      res.status(200).json({
        message: `${updateResult.modifiedCount} bookings updated successfully`,
      });
    } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Server error, please try again later" });
    }
  };
  