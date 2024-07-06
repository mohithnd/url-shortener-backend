const express = require("express");
const { PORT } = require("./config/serverConfig");
const urlRouter = require("./routes/urlRoutes");
const dbConnect = require("./config/dbConfig");

const app = express();

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));

app.use("/url", urlRouter);

app.listen(PORT, async () => {
  await dbConnect();
  console.log(`Server Is Running On Port: ${PORT}`);
});
