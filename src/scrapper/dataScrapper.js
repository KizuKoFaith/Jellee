const axios = require("axios");
const BASE_DATA = "https://jellee11.github.io/Jellee/src/data/maindata.json";

async function scrapeLatestUpdate(){
  const response = await axios(BASE_DATA);
  const novels = response.data;
  return novels;
}
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
async function scrapeMostPopular() {
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
    uniqueNovels.sort((a, b) => b.anilist.popularity - a.anilist.popularity);

    return uniqueNovels;
  } catch (error) {
    console.error("Error fetching or filtering data:", error.message);
    throw error;
  }
}
async function scrapeInfo(id) {
  try {
    const response = await axios.get(BASE_DATA);
    const novels = response.data;

    if (!Array.isArray(novels)) {
      throw new Error("Expected an array but received something else.");
    }

    // Find the main novel by ID
    const novel = novels.find(novel => novel.id === id);

    if (!novel) {
      throw new Error(`No novel found with ID: ${id}`);
    }

    // Extract title from the main novel
    const { title } = novel;

    // Find similar novels based on the title
   const volumeList = novels
      .filter(item => item.title === title) // Example: same title but different ID
      .map(item => ({
        id: item.id,
        title: item.title,
        cover: item.cover,
        volumeNumber: item.updatedTo,
        epub: item.epub,
        pdf: item.pdf
      }));

    return {
      novel,
      volumeList
    };
  } catch (error) {
    console.error("Error in scrapeInfo:", error.message);
    throw error;
  }
}

module.exports = {
  scrapeLatestUpdate,
  scrapeMostRated,
  scrapeMostPopular,
  scrapeInfo
};