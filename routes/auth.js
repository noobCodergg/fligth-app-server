const express = require("express");

const { register, login, logout,authUser,adminDashboard } = require("../controllers/authController");
const { verifyToken } = require("../middleware/auth");
const {authorizeRoles}=require("../middleware/auth")


const router = express.Router();



router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/authUser",verifyToken,authUser)
router.get('/adminDashboard', verifyToken, authorizeRoles('Admin'),adminDashboard)

module.exports = router;
