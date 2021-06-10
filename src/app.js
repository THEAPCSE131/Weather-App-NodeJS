const path = require("path");
const express = require("express");
const { join } = require("path");
const hbs = require("hbs");
const forecast = require("./utils/forecast");
const geocode = require("./utils/geocode");

const app = express();
const port = process.env.PORT || 3000;

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//Setup handlebars engine and view location
app.set("view engine", "hbs");
app.set("views", viewPath);
hbs.registerPartials(partialsPath);

//Setup static  directory
app.use(express.static(publicDirectoryPath));

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather",
    name: "Abhishek Pathak",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About Me",
    name: "Abhishek Pathak",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    msg: "This is example message for help page!!",
    title: "Help",
    name: "Abhishek Pathak",
  });
});

app.get("/help/*", (req, res) => {
  res.render("error", {
    title: 404,
    name: "Abhishek Pathak",
    msg: "Help artical not found",
  });
});

app.get("/weather", (req, res) => {
  let address = req.query.address;
  if (!address) {
    return res.send({ error: "Address Required!!" });
  } else {
    geocode(address, (error, { latitude, longitude, location } = {}) => {
      if (error) {
        return res.send({ error });
      }

      forecast(latitude, longitude, (error, forecastData) => {
        if (error) {
          return res.send({ error });
        } else {
          res.send({
            forecast: forecastData,
            location,
            address,
          });
        }
      });
    });
  }
});

app.get("/products", (req, res) => {
  if (!req.query.search) {
    return res.send({ error: "You must provide search!!" });
  } else {
    console.log(req.query.search);
    res.send({
      products: [],
    });
  }
});

app.get("*", (req, res) => {
  res.render("error", {
    title: 404,
    name: "Abhishek PATHAK",
    msg: "My page 404error ",
  });
});

app.listen(port, () => {
  console.log("Server is up on port" + port);
});
