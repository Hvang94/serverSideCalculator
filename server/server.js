const express = require("express");
const bodyParser = require("body-parser");
const app = express();
let PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(express.static("server/public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Global variable that will contain all of the
// calculation objects:
let serverCalculate = [];
let result = 0;
// Here's a wonderful place to make some routes:

// GET /calculations
app.get("/calculator", (req, res) => {
  console.log("inside /get request", serverCalculate);
  res.send(serverCalculate);
});
// POST /calculations
app.post("/calculator", (req, res) => {
  console.log("inside /post request", req.body);
  let num1 = req.body.num1;
  let num2 = req.body.num2;
  let operator = req.body.operator;

  switch (operator) {
    case "+":
      result = num1 + num2;
      break;
    case "-":
      result = num1 - num2;
      break;
    case "*":
      result = num1 * num2;
      break;
    case "/":
      result = num1 / num2;
      break;
    default:
  }
  serverCalculate.push({
    numOne: num1,
    numTwo: num2,
    operator: operator,
    result: result,
  });
  console.log(serverCalculate);
  res.sendStatus(200);
});
// PLEASE DO NOT MODIFY ANY CODE BELOW THESE BEARS:
// 🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸  🐻  🐻‍❄️  🧸

// Makes it so you don't have to kill the server
// on 5000 in order to run the tests:
if (process.env.NODE_ENV === "test") {
  PORT = 5001;
}

// This starts the server...but also stores it in a variable.
// This is weird. We have to do it for testing reasons. There
// is absolutely no need for you to reason about this.
const server = app.listen(PORT, () => {
  console.log("server running on: ", PORT);
});

// server.setTimeout(500)

// This is more weird "for testing reasons" code. There is
// absolutely no need for you to reason about this.
app.closeServer = () => {
  server.close();
};

app.setCalculations = (calculationsToSet) => {
  calculations = calculationsToSet;
};

module.exports = app;
