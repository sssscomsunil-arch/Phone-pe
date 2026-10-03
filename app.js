let currentAmount = 199;
let pinCode = "";

const $ = id => document.getElementById(id);


function showScreen(id) {

  document
    .querySelectorAll(".screen")
    .forEach(screen => {
      screen.classList.remove("active");
    });

  $(id).classList.add("active");
}


function goHome() {

  showScreen("home");

}


function startPayment(amount) {

  currentAmount = amount;

  $("amount").value = amount;

  showScreen("pay");

}


function openMethods() {

  currentAmount =
    Number(
      ($("amount").value || 199)
      .replace(/\D/g, "")
    ) || 199;

  updateMoney();

  showScreen("methods");

}


function closeMethods() {

  showScreen("pay");

}


function updateMoney() {

  const money =
    "₹" + currentAmount.toLocaleString("en-IN");

  [
    "sheetAmount",
    "bankAmount",
    "payAmount",
    "pinAmount"
  ].forEach(id => {

    if ($(id)) {
      $(id).textContent = money;
    }

  });

}


function showPin() {

  pinCode = "";

  $("dots").textContent =
    "— — — —";

  showScreen("pin");

  updateMoney();

}


function pin(number) {

  if (pinCode.length >= 4)
    return;

  pinCode += number;

  $("dots").textContent =
    pinCode
      .replace(/./g, "•")
      .padEnd(4, "—")
      .split("")
      .join(" ");

}


function clearPin() {

  pinCode =
    pinCode.slice(0, -1);

  $("dots").textContent =
    pinCode
      .replace(/./g, "•")
      .padEnd(4, "—")
      .split("")
      .join(" ");

}


function submitPin() {

  showScreen("connecting");

  setTimeout(
    showSuccess,
    1800
  );

}


function showSuccess() {

  const id =
    "DEMO" +
    Date.now()
      .toString()
      .slice(-8);

  const date =
    new Date()
      .toLocaleString("en-IN");


  $("successAmount").textContent =
    "₹" +
    currentAmount.toLocaleString("en-IN");


  $("orderId").textContent =
    id;

  $("txnId").textContent =
    id;

  $("date").textContent =
    date;

  $("txnDate").textContent =
    date;

  $("txnAmount").textContent =
    "₹" +
    currentAmount.toLocaleString("en-IN");

  $("debited").textContent =
    "₹" +
    currentAmount.toLocaleString("en-IN");

  $("tid").textContent =
    id;


  showScreen("success");

}


function showTransaction() {

  showScreen("transaction");

}


function showDemoInfo() {

  alert(
    "Demo only — no real payment, bank transfer, UPI or PIN is performed."
  );

}


if ("serviceWorker" in navigator) {

  navigator.serviceWorker
    .register("sw.js")
    .catch(() => {});

}
