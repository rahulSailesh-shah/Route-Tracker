const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/error");

dotenv.config({ path: "./config/config.env" });

connectDB();

//Route files
const auth = require("./routes/auth");
const users = require("./routes/users");
const tracks = require("./routes/tracks");

const app = express();

app.use(express.json());

const PORT = 8000 || process.env.PORT;

//Mount Routes
app.use("/api/v1/auth", auth);
app.use("/api/v1/user", users);
app.use("/api/v1/track", tracks);

//Error Handler
app.use(errorHandler);

const server = app.listen(PORT, console.log(`Server Running on Port: ${PORT}`));

process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`);
  server.close(() => process.exit(1));
});
