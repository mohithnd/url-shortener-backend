const shortUniqueId = require("short-unique-id");
const {
  createUrl,
  getUrlById,
  getUrlByUrl,
} = require("../repositories/urlRepository");
const { isUrlValid, repairUrl } = require("../utils/urlValidatorAndRepair");

const createShortUrl = async (req, res) => {
  let { url } = req.body;

  if (!url) {
    return res.json({
      success: false,
      error: "URL Not Found In Request Body",
    });
  }

  if (!isUrlValid(url)) {
    return res.json({
      success: false,
      error: "URL Is Not Valid",
    });
  }

  url = repairUrl(url);

  const prev = await getUrlByUrl(url);

  if (prev.success && prev.url) {
    return res.json({
      success: true,
      url,
      shortId: prev.url.shortId,
    });
  }

  const { randomUUID } = new shortUniqueId({ length: 10 });
  const shortId = randomUUID();

  const ans = await createUrl(url, shortId);

  if (!ans.success) {
    return res.json({
      success: false,
      error: "Internal Server Error",
    });
  }

  return res.json({
    success: true,
    url,
    shortId: ans.url.shortId,
  });
};

const getOriginalUrl = async (req, res) => {
  const { id } = req.params;

  const ans = await getUrlById(id);

  if (!ans.success) {
    return res.json({
      success: false,
      error: "Internal Server Error",
    });
  }

  if (!ans.url) {
    return res.json({
      success: false,
      error: "URL Not Found In Database",
    });
  }

  return res.json({
    success: true,
    url: ans.url.url,
  });
};

module.exports = {
  createShortUrl,
  getOriginalUrl,
};
