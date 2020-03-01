const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

const pathToHTML = path.join(__dirname, "..\\public");
const viewsPath = path.join(__dirname, "..\\templates\\views");
const partialPath = path.join(__dirname, "..\\templates\\partials");

app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialPath);

//serve static directory to serve like Index.html
app.use(express.static(pathToHTML));

app.get("", (req, res) => {
  res.render("renderHTML", {
    title: "Index Page",
    name: "Andrew Made"
  });
});

app.get("/about", (req, res) => {
  res.send(
    "Welcome to Express! It is a javascript library for backend and front end developers! "
  );
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: " You must provide address!!"
    });
  }

  geocode(
    req.query.address,
    (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        }

        res.send({
          forecast: forecastData,
          location,
          address: req.query.address
        });
      });
    }
  );
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Today's Weather for Your Location",
    name: "Sahil"
  });
});

app.listen(3000, () => {
  console.log("Server is listening on port 3000");
});
