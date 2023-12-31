require("dotenv").config(); // read environment variables from .env file
// const { S3 } = require("@aws-sdk/client-s3");
// const AWS = require("aws-sdk");
const uuid = require("uuid");
const express = require("express");
const cors = require("cors"); // middleware to enable CORS (Cross-Origin Resource Sharing)
const app = express();
const port = process.env.PORT; // use environment variables
const host = process.env.HOST;
app.use(cors()); //enable ALL CORS requests (client requests from other domain)
app.use(express.json()); //enable parsing JSON body data

// AWS.config.getCredentials(function (err) {
//   if (err) console.log(err.stack);
//   else {
//     console.log("Access key:", AWS.config.credentials.accessKeyId);
//   }
// });

app.get("/", function (req, res) {
  res.status(200).json({ message: "home" });
});

app.use("/users", require("./routes/users.routes.js"));
app.use("/files", require("./routes/files.routes.js"));

app.all("*", function (req, res) {
  res.status(404).json({ message: "WHAT???" });
});
const server = app.listen(port, host, () =>
  console.log(`App listening at http://${host}:${port}/`)
);

module.exports = { app, server };
