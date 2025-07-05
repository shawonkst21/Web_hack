const BASE_URL = "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");

// Populate dropdowns with countryList
for (let select of dropdowns) {
  for (let code in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = code;
    newOption.value = code;

    if (select.name === "From" && code === "USD") {
      newOption.selected = true;
    } else if (select.name === "To" && code === "BDT") {
      newOption.selected = true;
    }

    select.append(newOption);
  }

  // Add flag update listener
  select.addEventListener("change", (evt) => {
    updateFlag(evt.target);
  });
}

// Function to update the exchange rate
const updateExchangeRate = async () => {
  let amount = document.querySelector(".amount input");
  let amtVal = amount.value;

  if (amtVal === "" || amtVal < 1) {
    amtVal = 1;
    amount.value = "1";
  }
    const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
     let response = await fetch(URL);
  let data = await response.json();
  let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()]; 
  
  let finalAmount = amtVal * rate;
  msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;

    console.log(finalAmount);
};

// Function to update the flag based on selection
const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// Button click listener
btn.addEventListener("click", (evt) => {
  evt.preventDefault();
  updateExchangeRate();
});

// Auto fetch exchange rate on page load
window.addEventListener("load", updateExchangeRate);
