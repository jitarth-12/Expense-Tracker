const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const colors = require("colors");
const connectDB = require("./config/connectDb");
const path = require("path");
// dotenv config
dotenv.config();

connectDB();

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(express.json());
//route
//for user
app.use("/api/users", require("./routes/userRoute"));
//for transection
app.use("/api/transections", require("./routes/transectionRoute"));

// app.get("/", (req, res) => {
//   res.send("API is running");
// });

//deployement

const __dirname1 = path.resolve();
if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname1, "/client/build")));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "client", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is running..");
  });
}
//deployment
const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  console.log(`Server running in ${PORT} `);
});
