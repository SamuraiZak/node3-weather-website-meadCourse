console.log("Client side javascript file is loaded!");

// fetch("http://puzzle.mead.io/puzzle").then((response) => {
//   console.log("oi");
//   response.json().then((data) => {
//     console.log(data);
//   });
// });

// fetch("http://localhost:3000/weather?address=kuching").then((response) => {
//   response.json().then((data) => {
//     if (data.error) {
//       console.log(data.error);
//     } else {
//       console.log(data);
//     }
//   });
// });

// select the form from index.hbs
const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const messageOne = document.querySelector("#message-1");
const messageTwo = document.querySelector("#message-2");

weatherForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default behaviour which is refresh browser

  const location = search.value;

  messageOne.textContent = "Loading...";
  messageTwo.textContent = "";

  fetch("/weather?address=" + location).then(
    (response) => {
      response.json().then((data) => {
        if (data.error) {
          messageOne.textContent = `${data.error}`;
        } else {
          messageOne.textContent = `Location: ${data.location}`;
          messageTwo.textContent = `The weather in here is currently ${data.forecast.condition}, with a temperature of ${data.forecast.temp_c}C, but it feels like it is ${data.forecast.feelslike_c}C. (Last updated at ${data.forecast.last_updated})`;
        }
      });
    }
  );
});

//
