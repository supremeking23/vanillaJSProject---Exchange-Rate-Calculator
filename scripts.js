const currencyElementOne = document.getElementById("currency-one");
const currencyElementTwo = document.getElementById("currency-two");
const amountElementOne = document.getElementById("amount-one");
const amountElementTwo = document.getElementById("amount-two");

const rateElement = document.getElementById("rate");
const swap = document.getElementById("swap");

//Fetch exchange rates and update the dom
function calculate(){
 const currency_one = currencyElementOne.value;
 const currency_two = currencyElementTwo.value;

//  https://v6.exchangerate-api.com/v6/8e2d9bb925a9b6bf6f6f5c9b/latest/USD
// https://api.exchangerate-api.com/v4/latest/${currency_one}
 fetch(`https://api.exchangerate-api.com/v4/latest/${currency_one}`)
 .then(res => res.json())
 .then(data => {
     console.log(data.rates);
    const rate = data.rates[currency_two];
    console.log(`currency two ${currency_two}:  ${rate}`);

    rateElement.innerText = `1 ${currency_one} = ${rate} ${currency_two}`;

    // Convert a number into a string, rounding the number to keep only two decimals:
    amountElementTwo.value = (amountElementOne.value * rate).toFixed(2);
 });

 console.log(currency_one,currency_two)
}

//Event Listeners
currencyElementOne.addEventListener("change",calculate);
amountElementOne.addEventListener("input",calculate);
currencyElementTwo.addEventListener("change",calculate);
amountElementTwo.addEventListener("change",calculate);


swap.addEventListener("click",() => {
    const temp = currencyElementOne.value;
    currencyElementOne.value = currencyElementTwo.value;
    currencyElementTwo.value = temp;
    calculate();

});