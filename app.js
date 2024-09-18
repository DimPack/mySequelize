const express = require("express");
const app = express();

app.use(express.json());

//router
app.use("/", router);

//handlerError
module.exports = app;
