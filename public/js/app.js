const weatherForm = document.querySelector("form");
const addressInput = document.querySelector("input");
const forecast = (address) =>
  fetch("/weather?address=" + address).then((response) => {
    response.json().then((data) => {
      if (data.error) {
        var x = document.createElement("UL");
        x.setAttribute("id", "myUL");
        weatherForm.appendChild(x);

        var y = document.createElement("LI");
        var t = document.createTextNode(data.error);
        y.appendChild(t);
        document.getElementById("myUL").appendChild(y);
      } else {
        var x = document.createElement("UL");
        x.setAttribute("id", "myUL");
        weatherForm.appendChild(x);

        var y = document.createElement("LI");
        var t = document.createTextNode(data.description);
        y.appendChild(t);
        document.getElementById("myUL").appendChild(y);
      }
      // document
      //   .querySelector("li")
      //   .appendChild(document.createTextNode(data.description));

      return data;
    });
  });
weatherForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const forecastData = forecast(addressInput.value);
  console.log(forecastData);
});
