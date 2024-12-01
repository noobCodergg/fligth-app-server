const express = require("express");
const cookieParser = require("cookie-parser");
const cors=require('cors')
const connectDB = require("./config/db");
const authRoutes = require("./routes/auth");
const flightRoutes=require("./routes/flight")
const userRoutes=require("./routes/user")

require("dotenv").config();

// Connect to database
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(cors({
    origin:'flight-app-frontend-beta.vercel.app',
    methods:["POST","GET","PUT","DELETE"],
    credentials:true
}))

app.use("fligth-app-server.vercel.app/api/auth", authRoutes);
app.use("fligth-app-server.vercel.app/api/flight",flightRoutes)
app.use("fligth-app-server.vercel.app/api/user",userRoutes)
// Start server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
