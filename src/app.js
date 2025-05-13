const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode.js");
const forecast = require("./utils/forecast.js");

const app = express();
//Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and views locations
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

//Setup static directory to serve
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "Mohd Zaki",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About",
    name: "Mohd Zaki",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    message: "this is some helpful text",
    title: "Help",
    name: "Mohd Zaki",
  });
});

app.get("/weather", (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: "address was not provided",
    });
  }
  console.log(req.query.address);

  geocode(req.query.address, (error, data) => {
    if (error) {
      return res.send({ error: error });
    }

    forecast(data.latitude, data.longitude, (error, forecastData) => {
      if (error) {
        return res.send({ error: error });
      }

      return res.send({
        forecast: forecastData,
        location: data.location,
        address: req.query.address,
      });
    });
  });

  // res.send({
  //   forecast: "It is snowing (I wish)",
  //   location: "Philadelphia",
  //   address: req.query.address,
  // });
});

app.get("/product", (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: "You must provide a search term",
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get("/help/*", (req, res) => {
  res.render("404", {
    title: "404",
    name: "Mohd Zaki",
    errorMessage: "Help article not found",
  });
});

app.get("*", (req, res) => {
  res.render("404", {
    title: "404",
    errorMessage: "Page not found",
    name: "Mohd Zaki",
  });
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
