console.log("client.js is sourced!");
function onReady() {
  renderMath();
}

let operator;
function setOperator(symbol, event) {
  event.preventDefault();
  operator = symbol;
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
      renderMath();
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
      let tesHistory = [];
      incomingArr.forEach((math) => {
        recentResults.innerHTML = math.result;
        tesHistory.push(`<li>${math.numOne}${math.operator}${math.numTwo} = ${math.result}</li>`)
      });
      resultHistory.innerHTML = tesHistory
      console.log(tesHistory);
    })
    .catch((error) => {
      console.log("server error", error);
    });
}
onReady();
