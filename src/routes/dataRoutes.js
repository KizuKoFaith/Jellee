const express = require("express");
const {
  getLatestUpdate,
  getMostRated,
  getMostPopular,
  getInfo
} = require("../controllers/dataController");

const router = express.Router();

// Define the route for the newest novels
router.get("/jellee/latest", getLatestUpdate);
router.get("/jellee/most-rated", getMostRated);
router.get("/jellee/popular", getMostPopular);
router.get("/jellee/info", getInfo);

module.exports = router;
