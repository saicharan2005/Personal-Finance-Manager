const express = require("express");
const serverless = require("serverless-http");
require("dotenv").config();
const cors = require("cors");
const path = require("path");
const connectDB = require("../config/db");


const authRoutes = require("../routes/authRoutes");
const incomeRoutes = require("../routes/incomeRoutes");
const expenseRoutes = require("../routes/expenseRoutes");
const dashboardRoutes = require("../routes/dashboardRoutes");

const app = express();

app.use(
  cors({
    origin: [
      "https://personal-finance-manager-9ijl.vercel.app",
      "http://localhost:5173",
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);

app.use(express.json());
connectDB();

app.use("/api/auth", authRoutes);
app.use("/api/income", incomeRoutes);
app.use("/api/expense", expenseRoutes);
app.use("/api/dashboard", dashboardRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));

module.exports = app;
module.exports.handler = serverless(app);
