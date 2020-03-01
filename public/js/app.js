const weatherForm = document.querySelector("form");
const search = document.querySelector("input");
const weatherUpdatef = document.querySelector("#weatherUpdate-f");
const weatherUpdatea = document.querySelector("#weatherUpdate-a");

weatherForm.addEventListener("submit", e => {
  e.preventDefault();
  const location = search.value;

  fetch("http://localhost:3000/weather?address=" + location).then(response => {
    response.json().then(data => {
      if (data.error) {
        weatherUpdatef.textContent = data.error;
      } else {
        weatherUpdatef.textContent = data.forecast;
        weatherUpdatea.textContent = data.location;
        // console.log(data.address);
      }
    });
  });
});
