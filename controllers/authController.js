const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

exports.register = async (req, res) => {
 
  try {
    const { name, email, password, role, phone } = req.body;

    // Check if user exists
    if (await User.findOne({ email })) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash password
    const hashedPassword = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
    
    // Create user
    User.create({ name, email, password: hashedPassword, role,phone })
    
    res.status(201).json({ message: "User registered successfully" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validate password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    // Generate token
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });

    // Set cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure:true,
      sameSite:none,
      maxAge: parseInt(process.env.COOKIE_EXPIRES_IN),
    });
    if(user.role==="User"){
      res.status(200).json({ message: "Login successful",id:user._id,name:user.name,email:user.email,phone:user.phone });
    }
    if(user.role==="Admin"){
      res.status(201).json({message:"Login successfull",id:user._id})
    }
    
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
};

exports.logout = (req, res) => {
  try {
    // Clear the authentication token cookie
    res.clearCookie("token", { httpOnly: true, secure: true, sameSite: "Strict" });

    // Send a success response
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    // Log the error for debugging purposes
    console.error("Error during logout:", error);

    // Send an error response
    res.status(500).json({ error: "An error occurred during logout. Please try again later." });
  }
};

exports.authUser=(req,res)=>{
  res.status(200).json("User authenticated")
}

exports.adminDashboard=(req,res)=>{
  res.status(201).json({ message: 'Welcome to the admin dashboard' });
}
