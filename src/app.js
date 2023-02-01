const path = require("path");
const express = require("express");
const hbs = require("hbs");
const weather = require("./utils/weather.js").weather;
const geocode = require("./utils/geocode.js").geocode;

const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

const app = express();
const port = process.env.PORT || 3000;

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Rafael",
  });
});
app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Rafael",
  });
});
app.get("/help", (req, res) => {
  res.render("help", {
    title: "Help",
    name: "Rafael",
  });
});
app.use(express.static(publicDirectoryPath));

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    res.send({ error: "You must provide an address term" });
  } else {
    geocode(
      req.query.address,
      (error, { latitude, longitude, location } = {}) => {
        if (error) {
          res.send(error);
        } else {
          weather(
            latitude,
            longitude,
            location,
            (error, { description, temperature, feelslike } = {}) => {
              if (error) {
                res.send(error);
              } else {
                res.send({
                  description,
                  temperature,
                  feelslike,
                  address: req.query.address,
                });
              }
            }
          );
        }
      }
    );
  }
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    error: "Page not found",
  });
});

app.listen(port, () => {
  console.log("Server is up on port " + port + ".");
});
