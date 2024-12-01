const express = require("express");

const {createFlight,getAllFlights,getAvailableFlights,getFlightDetails,postBooking,getBookings,updateFlight,deleteFLight}=require('../controllers/flightControllers')



const router = express.Router();



router.post("/createflight", createFlight);
router.get("/flights",getAllFlights);
router.get("/searchflights",getAvailableFlights)
router.get("/getflightdetails/:id",getFlightDetails)
router.post("/postbooking",postBooking)
router.get('/getbookings',getBookings)
router.put('/updateflight/:flightId',updateFlight)
router.delete('/deleteflight/:id',deleteFLight)



module.exports = router;