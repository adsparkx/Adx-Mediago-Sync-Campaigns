require("dotenv").config();
const express = require("express");
const port = process.env.PORT;
const app = express();
const { mongoDB } = require("./config/mongo");
mongoDB();
const cron = require("./cron/cron");
cron.initializeCron();
// app.listen(port, () => {
//   console.log("listening on http://localhost:" + port);
// });
