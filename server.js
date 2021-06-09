const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");

//Load env variables
dotenv.config({ path: "./config/config.env" });

// Connect to database
connectDB();

const app = express();

// Body parser
app.use(express.json());

// Enable cors
app.use(cors());

// Set static folder for frontend
app.use(express.static(path.join(__dirname, "public")));

// Routes
app.use("/api/v1/amazons", require("./routes/amazons"));

const PORT = process.env.PORT || 8000;

// localhost
app.listen(PORT, () =>
  console.log(
    `SERVER IS RUNNING IN ${process.env.NODE_ENV} mode on port ${PORT}`
  )
);
