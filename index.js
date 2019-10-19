const express = require("express");
const bodyParser = require("body-parser");
const request = require("request");

const app = express();

app.use(bodyParser.urlencoded({
  extended: true
}));


app.listen(3000, function() {
  console.log("Server started listening");
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.post("/", function(req, res) {

  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var baseURL = "https://apiv2.bitcoinaverage.com/indices/global/ticker/";
  var url = baseURL + crypto + fiat;
  request(url, function(error, response, body) {

    var data = JSON.parse(body);
    console.log(data);
    var last = data.last;
    var date = data.display_timestamp
    res.send("<h2>Crypto currency conversion for the date" + date + "</h2>" +
      "<h1>" + "1" + crypto + " = " + last + fiat + "</h1>");
  });

});

app.post("/calculate", function(req, res) {

  var amount = req.body.amount
  var crypto = req.body.crypto;
  var fiat = req.body.fiat;

  var baseURL = "https://apiv2.bitcoinaverage.com/convert/global";

  var options = {
    url: baseURL,
    method: "GET",
    qs: {
      from: crypto,
      to: fiat,
      amount: amount
    }
  };

  request(options, function(error, response, body) {

    var data = JSON.parse(body);
    console.log(data);
    var last = data.price;
    var date = data.time
    res.send("<h2>Crypto currency conversion for the date" + date + "</h2>" +
      "<h1>" + amount + crypto + " = " + last + fiat + "</h1>");
  });

});
