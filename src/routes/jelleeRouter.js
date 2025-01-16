const express = require("express");
const {
  getLatestUpdate,
  getMostRated,
  getMostPopular,
  getInfo,
  getSearch,
  getByPublisher,
  getByFilter,
  getVolumes,
  getRecommendations
} = require("../controllers/jelleeController");

const router = express.Router();

// Define the route for the newest novels
router.get("/jellee/latest", getLatestUpdate);
router.get("/jellee/most-rated", getMostRated);

router.get("/jellee/popular", getMostPopular);
router.get("/jellee/info", getInfo);

router.get("/jellee/search", getSearch);

router.get("/jellee/publisher", getByPublisher);

router.get("/jellee/filter", getByFilter);

router.get("/jellee/volumes", getVolumes);

router.get("/jellee/recommendation", getRecommendations);

module.exports = router;