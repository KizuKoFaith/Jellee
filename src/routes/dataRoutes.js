const express = require("express");
const getMostRated = require("../controllers/dataController");

const router = express.Router();

// Define the route for the newest novels
router.get("/jellee/most-rated", getMostRated);

module.exports = router;
