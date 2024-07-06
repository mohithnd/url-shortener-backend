const { Router } = require("express");
const {
  createShortUrl,
  getOriginalUrl,
} = require("../controllers/urlController");

const urlRouter = Router();

urlRouter.post("/shorten", createShortUrl);

urlRouter.get("/:id", getOriginalUrl);

module.exports = urlRouter;
