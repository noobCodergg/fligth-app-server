const express=require('express')

const {user,updateUserData,userBookings,deleteBooking,updateBooking,allBooking,removeBooking,updateBookingDetails} =require('../controllers/userController');


const router = express.Router();

router.get('/user/:id',user)
router.put('/update/:id',updateUserData)
router.get('/userbooking/:id',userBookings)
router.delete('/deletebooking/:bookingId',deleteBooking)
router.put('/updatebooking/:bookingId',updateBooking)
router.get('/allbooking',allBooking)
router.delete('/deletebookingselect/:flightId',removeBooking)
router.put('/updatebookingdetail/:flightId',updateBookingDetails)

module.exports = router;