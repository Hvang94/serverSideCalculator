console.log("client.js is sourced!");
function onReady() {
  renderMath();
}

let operator;
function setOperator(symbol, event) {
  event.preventDefault();
  operator = symbol;
  console.log(num1, num2, operator);
}

function calculateHandler(event) {
  event.preventDefault();

  let num1 = parseFloat(document.getElementById("firstInput").value);
  let num2 = parseFloat(document.getElementById("secondInput").value);

  axios({
    method: "POST",
    url: "/calculator",
    data: {
      num1: num1,
      num2: num2,
      operator: operator,
    },
  })
    .then((response) => {
      console.log("successfully added", response);
    })
    .catch((error) => {
      console.log("server error", error);
    });
}

function renderMath() {
  axios({
    method: "GET",
    url: "/calculator",
  })
    .then((response) => {
      console.log("response from get", response.data);
      let recentResults = document.getElementById("recentResult");
      let resultHistory = document.getElementById("resultHistory");
      let incomingArr = response.data;
      let results = result;

      recentResults.innerHTML = "";
      resultHistory.innerHTML = ""
      recentResults += results;
      resultHistory =+ `<div> ${numOne} ${operator} ${numTwo} = ${result}</div>`
    })
    .catch((error) => {
      console.log("server error", error);
    });
}
onReady();
