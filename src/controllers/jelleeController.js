const {
  scrapeLatestUpdate,
  scrapeMostRated,
  scrapeMostPopular,
  scrapeInfo,
  scrapeSearch,
  scrapeByPublisher,
  filterScrap,
  volumesScrape,
  recommendationsScrape
} = require("../scrapper/jelleeScrapper");

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
    
    const reformNovels = novels.map(novel => ({
      id: novel.id,
      title: novel.title,
      cover: novel.cover,
      status: novel.status,
      type: novel.type,
      translation: novel.translation,
      genres: novel.genres,
      rating: novel.anilist.rating,
      popularity: novel.anilist.popularity,
      synopsis: novel.synopsis
    }));

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
  } catch (error) {
    console.error("error in getLatestUpdate:", error.message);
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
      translation: novel.translation,
      genres: novel.genres,
      rating: novel.anilist.rating,
      popularity: novel.anilist.popularity,
      synopsis: novel.synopsis
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
  } catch (error) {
    console.error("error in getMostRated:", error.message);
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
      translation: novel.translation,
      genres: novel.genres,
      rating: novel.anilist.rating,
      popularity: novel.anilist.popularity,
      synopsis: novel.synopsis
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
  } catch (error) {
    console.error("error in getMostRated:", error.message);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch data from Jellee!"
    });
  }
}

async function getSearch(req, res) {
  const query = req.query.query;
  if(!query || query.trim() == ""){
    return res.status(400).send({
        success: true,
        message: "Query is required!"
    });
  }
  try {
    // Fetch all filtered data
    const novels = Array.isArray(await scrapeSearch(query)) ? await scrapeSearch(query) : [];
   /*let novels = scrapeSearch(query);
   if(!Array.isArray(novels)) {
     novels = [];
   } */
   
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
      translation: novel.translation,
      genres: novel.genres,
      rating: novel.anilist.rating,
      popularity: novel.anilist.popularity,
      synopsis: novel.synopsis
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
  } catch (error) {
    console.error("error in search:", error.message);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch data from Jellee!"
    });
  }
}

async function getByPublisher(req, res) {
  const query = req.query.query || "Yen Press";
  const sortBy = req.query.sortBy || "rating";
  try {
    // Fetch all filtered data
    const novels = Array.isArray(await scrapeByPublisher(query)) ? await scrapeByPublisher(query) : [];

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
      translation: novel.translation,
      genres: novel.genres,
      rating: novel.anilist.rating,
      popularity: novel.anilist.popularity,
      synopsis: novel.synopsis
    }));
    
    reformNovels.sort((a,b) => {
      if(sortBy === "rating"){
        return b.rating - a.rating;
      }else if(sortBy === "popularity"){
        return b.popularity - a.popularity;
      }else{
        return 0;
      }
    });

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
  } catch (error) {
    console.error("error in ", error.message);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch data from Jellee!"
    });
  }
}

async function getByFilter(req, res) {
  const type = req.query.type || null;
  const genre = req.query.genre ? req.query.genre.split(",") : [];
  const status = req.query.status ? req.query.status.toLowerCase() : null;
  const publisher = req.query.publisher ? req.query.publisher.toLowerCase() : null;
  
  try {
    // Fetch all filtered data
    /* const novels = Array.isArray(await filterScrap({ genres: genre })) ? await filterScrap({ genres: genre }) : [];*/
    const novels = Array.isArray(await filterScrap({ 
      genres: genre, 
      status: status, 
      publisher: publisher 
    })) ? await filterScrap({ genres: genre, status: status, publisher: publisher }) : [];

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
      translation: novel.translation,
      genres: novel.genres,
      rating: novel.anilist.rating,
      popularity: novel.anilist.popularity,
      synopsis: novel.synopsis
    }));
    
    reformNovels.sort((a, b) => {
      if (type === "all") {
        return a.title.localeCompare(b.title);
      } else if (type === "popularity") {
        return b.popularity - a.popularity;
      } else if (type === "ratings") {
        return b.rating - a.rating;
      }
      return 0; // Default no sorting for unknown types
    });

    // Get page and perPage from query parameters with validation
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const perPage = Math.max(1, parseInt(req.query.perPage) || 10);

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
  } catch (error) {
    console.error("Error in getByFilter:", error.message);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch data from Jellee!"
    });
  }
}

async function getVolumes(req, res) {
  const id = req.query.id;
  if (!id || id.trim() === "") {
    return res.status(400).send({
      success: false,
      message: "Specific ID is required!"
    });
  }

  try {
    // Fetch volumes using volumesScrape
    const volumes = await volumesScrape(id);

    // Handle case when no volumes are found
    if (!volumes || volumes.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No volumes found!",
        total: 0,
        data: []
      });
    }
    
    // Get page and perPage from query parameters with validation
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const perPage = Math.max(1, parseInt(req.query.perPage) || 10);

    // Calculate start and end indexes for slicing
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;

    // Slice the array to get paginated results
    const paginatedVolumes = volumes.slice(startIndex, endIndex);

    // Return the paginated data along with metadata
    return res.status(200).send({
      success: true,
      total: volumes.length,
      page,
      perPage,
      data: paginatedVolumes
    });
  } catch (error) {
    console.error("Error in getVolumes:", error.message);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch data!"
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

async function getRecommendations(req, res) {
  const id = req.query.id;
  if (!id || id.trim() === "") {
    return res.status(400).send({
      success: false,
      message: "Specific ID is required!"
    });
  }

  try {
    const recommendations = await recommendationsScrape(id);
    
    if (!recommendations || recommendations.length === 0) {
      return res.status(200).send({
        success: true,
        message: "No recommendations found!",
        total: 0,
        data: []
      });
    }
    
    const reformNovels = recommendations.map(novel => ({
      id: novel.id,
      title: novel.title,
      cover: novel.cover,
      status: novel.status,
      type: novel.type,
      translation: novel.translation,
      genres: novel.genres,
      rating: novel.anilist.rating,
      popularity: novel.anilist.popularity,
      synopsis: novel.synopsis
    }));
    
    reformNovels.sort((a, b) => b.popularity - a.popularity);
    
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const perPage = Math.max(1, parseInt(req.query.perPage) || 10);
    
    const startIndex = (page - 1) * perPage;
    const endIndex = page * perPage;
    
    const paginatedRecommendation = reformNovels.slice(startIndex, endIndex);
    return res.status(200).send({
      success: true,
      total: recommendations.length,
      page,
      perPage,
      data: paginatedRecommendation
    });
    
  } catch (error) {
    console.error("Failed to fetch recommendations:", error.message);
    return res.status(500).send({
      success: false,
      message: "Failed to fetch recommendations"
    });
  }
}

module.exports = {
  getLatestUpdate,
  getMostRated,
  getMostPopular,
  getInfo,
  getSearch,
  getByPublisher,
  getByFilter,
  getVolumes,
  getRecommendations
};