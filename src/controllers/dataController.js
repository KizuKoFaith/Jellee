const {
  scrapeLatestUpdate,
  scrapeMostRated,
  scrapeMostPopular,
  scrapeInfo
} = require("../scrapper/dataScrapper");

async function getLatestUpdate(req, res) {
  try {
    const novels = await scrapeLatestUpdate();

    // Get page and perPage from query parameters with validation
    const page = Math.max(1, parseInt(req.query.page) || 1); // Ensure page >= 1
    const perPage = Math.max(1, parseInt(req.query.perPage) || 10); // Ensure perPage >= 1
    // Calculate start and end indexes for slicing
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    // Handle pagination edge case
    if (startIndex >= novels.length) {
      return res.status(200).send({
        success: true,
        message: "No more data available!",
        total: novels.length,
        page,
        perPage,
        data: []
      });
    }

    // Slice the array to get paginated results
    const paginatedNovels = novels.slice(startIndex, endIndex);

    // Return the paginated data along with metadata
    return res.status(200).send({
      success: true,
      total: novels.length,
      page,
      perPage,
      data: paginatedNovels
    });
  } catch (error) {
    console.error("Error in getLatestUpdate:", err.message);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch data from Jellee!"
    });
  }
}
async function getMostRated(req, res) {
  try {
    // Fetch all filtered data
    const novels = Array.isArray(await scrapeMostRated())
      ? await scrapeMostRated()
      : [];

    // Handle empty data
    if (novels.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No novels found!",
        total: 0,
        page: 1,
        perPage: 10,
        data: []
      });
    }

    // Reform the data
    const reformNovels = novels.map(novel => ({
      id: novel.id,
      title: novel.title,
      cover: novel.cover,
      status: novel.status,
      type: novel.type,
      official: novel.official,
      translationBy: novel.translationBy
    }));

    // Get page and perPage from query parameters with validation
    const page = Math.max(1, parseInt(req.query.page) || 1); // Ensure page >= 1
    const perPage = Math.max(1, parseInt(req.query.perPage) || 10); // Ensure perPage >= 1

    // Calculate start and end indexes for slicing
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    // Handle pagination edge case
    if (startIndex >= novels.length) {
      return res.status(200).send({
        success: true,
        message: "No more data available!",
        total: novels.length,
        page,
        perPage,
        data: []
      });
    }

    // Slice the array to get paginated results
    const paginatedNovels = reformNovels.slice(startIndex, endIndex);

    // Return the paginated data along with metadata
    return res.status(200).send({
      success: true,
      total: novels.length,
      page,
      perPage,
      data: paginatedNovels
    });
  } catch (err) {
    console.error("Error in getMostRated:", err.message);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch data from Jellee!"
    });
  }
}
async function getMostPopular(req, res) {
  try {
    // Fetch all filtered data
    const novels = Array.isArray(await scrapeMostRated())
      ? await scrapeMostPopular()
      : [];

    // Handle empty data
    if (novels.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No novels found!",
        total: 0,
        page: 1,
        perPage: 10,
        data: []
      });
    }

    // Reform the data
    const reformNovels = novels.map(novel => ({
      id: novel.id,
      title: novel.title,
      cover: novel.cover,
      status: novel.status,
      type: novel.type,
      official: novel.official,
      translationBy: novel.translationBy
    }));

    // Get page and perPage from query parameters with validation
    const page = Math.max(1, parseInt(req.query.page) || 1); // Ensure page >= 1
    const perPage = Math.max(1, parseInt(req.query.perPage) || 10); // Ensure perPage >= 1

    // Calculate start and end indexes for slicing
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    // Handle pagination edge case
    if (startIndex >= novels.length) {
      return res.status(200).send({
        success: true,
        message: "No more data available!",
        total: novels.length,
        page,
        perPage,
        data: []
      });
    }

    // Slice the array to get paginated results
    const paginatedNovels = reformNovels.slice(startIndex, endIndex);

    // Return the paginated data along with metadata
    return res.status(200).send({
      success: true,
      total: novels.length,
      page,
      perPage,
      data: paginatedNovels
    });
  } catch (err) {
    console.error("Error in getMostRated:", err.message);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch data from Jellee!"
    });
  }
}
async function getInfo(req, res){
  const id = req.query.id;
  if(!id && id.trim() === ""){
    return res.status(400).send({
      success: false,
      message: "Specific ID is required!"
    });
  }
  try{
    const novels = await scrapeInfo(id);
    return res.status(200).send({
      success: true,
      data: novels
    });
  }catch(error){
    console.log("Failed to fetch data from Jellee");
    return res.status(500).send({
      success: false,
      message: "Failed to fetch data from Jellee"
    });
  }
}

module.exports = {
  getLatestUpdate,
  getMostRated,
  getMostPopular,
  getInfo
};
