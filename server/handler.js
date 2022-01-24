const LUNAR_MONTH = 29.530588853;

const getJulianDate = (date = new Date()) => {
  const time = date.getTime();
  const tzoffset = date.getTimezoneOffset();

  return time / 86400000 - tzoffset / 1440 + 2440587.5;
};

const normalize = (value) => {
  value = value - Math.floor(value);
  if (value < 0) {
    return (value = value + 1);
  } else return value;
};

const getLunarAgePercent = (date = new Date()) => {
  return normalize((getJulianDate(date) - 2451550.1) / LUNAR_MONTH);
};

const getLunarAge = (date = new Date()) => {
  const percent = getLunarAgePercent(date);
  const age = percent * LUNAR_MONTH;
  return age;
};

console.log("hello");

const getLunarPhase = (date = new Date()) => {
  const age = getLunarAge(date);
  if (age < 1.84566) return "New Moon";
  else if (age < 5.53699) return "Waxing Crescent";
  else if (age < 9.22831) return "First Quarter";
  else if (age < 12.91963) return "Waxing Gibbous";
  else if (age < 16.61096) return "Full Moon";
  else if (age < 20.30228) return "Waning Gibbous";
  else if (age < 23.99361) return "Last Quarter";
  else if (age < 27.68493) return "Waning Crescent";
  else return "New Moon";
};

const moonPhase = getLunarPhase();

const serverless = require("serverless-http");
const express = require("express");
const app = express();

app.get("/", (req, res, next) => {
  return res
    .status(200)
    .json({
      message: "Hello from root!",
    })
    .header("Access-Control-Allow-Origin", "*")
    .header("Access-Control-Allow-Credentials", true);
  // .header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
});

// app.use(middleware function for cors)
// Use this for all endpoint responses

app.get("/phase", (req, res, next) => {
  return res
    .status(200)
    .json({
      phase: moonPhase,
    })
    .header("Access-Control-Allow-Origin", "*")
    .header("Access-Control-Allow-Credentials", true);
  // .header("Access-Control-Allow-Origin", "*")
  // .header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
});

app.use((req, res, next) => {
  // res.header("Access-Control-Allow-Origin", "*");
  // res.header(
  //   "Access-Control-Allow-Headers",
  //   "Origin, X-Requested-With, Content-Type, Accept"
  // );
  // next();

  return res.status(404).json({
    error: "Not Found",
  });
});

module.exports.handler = serverless(app);
