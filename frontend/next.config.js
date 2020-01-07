require('dotenv').config({
  path: "../.env"
})

module.exports = {
  target: "serverless",
  env: {
    BACKEND_URL: process.env.BACKEND_URL
  }
};
