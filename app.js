const express = require("express");
const bodyParser = require("body-parser");
const app = express();

app.use(express.static(__dirname));

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.listen(3000, function () {
  console.log("Is running in the 3000 Port");
});
