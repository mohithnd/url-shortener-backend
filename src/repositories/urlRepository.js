const Url = require("../models/urlModel");

async function createUrl(url, shortId) {
  try {
    const ans = await Url.create({
      url,
      shortId,
    });
    return { success: true, url: ans };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

async function getUrl(shortId) {
  try {
    const ans = await Url.findOne({ shortId });
    return { success: true, url: ans };
  } catch (err) {
    console.log(err);
    return { success: false };
  }
}

module.exports = {
  createUrl,
  getUrl,
};
