const shortUniqueId = require("short-unique-id");
const { isUrl } = require("check-valid-url");
const { createUrl, getUrl } = require("../repositories/urlRepository");

const createShortUrl = async (req, res) => {
  const { url } = req.body;

  if (!url) {
    return res.json({
      success: false,
      error: "URL Not Found In Request Body",
    });
  }

  if (!isUrl(url)) {
    return res.json({
      success: false,
      error: "URL Is Not Valid",
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

  const ans = await getUrl(id);

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
