const express = require("express");

const {
  getDashboardData,
} = require("../controllers/dashboardController.js");

const protect = require("../middleware/authmiddleware");
const router = express.Router();


router.get("/", protect, getDashboardData);


module.exports = router;
