const axios = require("axios");
const BASE_DATA = "https://jellee11.github.io/Jellee/src/data/maindata.json";

async function scrapeMostRated() {
  try {
    const response = await axios.get(BASE_DATA);
    const novels = response.data;

    if (!Array.isArray(novels)) {
      throw new Error("Expected an array but received something else.");
    }

    // Create a map to store unique titles starting with "Volume 1"
    const uniqueNovelsMap = new Map();

    novels.forEach(novel => {
      if (novel.updatedTo === "Volume 1") {
        if (!uniqueNovelsMap.has(novel.title)) {
          uniqueNovelsMap.set(novel.title, novel);
        }
      }
    });

    // Convert map back to an array
    const uniqueNovels = Array.from(uniqueNovelsMap.values());

    // Sort the unique novels by rating from highest to lowest
    uniqueNovels.sort((a, b) => b.anilist.rating - a.anilist.rating);

    return uniqueNovels;
  } catch (error) {
    console.error("Error fetching or filtering data:", error.message);
    throw error;
  }
}

module.exports = scrapeMostRated;