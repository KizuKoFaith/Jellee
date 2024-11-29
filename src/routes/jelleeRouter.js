const express = require("express");
const {
  getLatestUpdate,
  getMostRated,
  getMostPopular,
  getInfo,
  getSearch
} = require("../controllers/jelleeController");

const router = express.Router();

// Define the route for the newest novels
router.get("/jellee/latest", getLatestUpdate);
router.get("/jellee/most-rated", getMostRated);
router.get("/jellee/popular", getMostPopular);
router.get("/jellee/info", getInfo);

router.get("/jellee/search", getSearch);

module.exports = router;