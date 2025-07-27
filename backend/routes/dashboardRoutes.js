const express = require("express");

const {
  getDashboardData,
} = require("../controllers/dashboardController.js");

const protect = require("../middleware/authMiddleware");
const router = express.Router();


router.get("/", protect, getDashboardData);


module.exports = router;
