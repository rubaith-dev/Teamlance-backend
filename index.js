const express = require("express");
require('express-async-errors');
const dotenv = require("dotenv");
const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
// const { errorHandlerMiddleware } = require("./middlewares");


dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(
  cors({
    origin: [process.env.PUBLIC_URL],
    method: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());


// app.use("/api/auth", authRoutes);

// app.use(errorHandlerMiddleware)

app.listen(port, () => {
  console.log(`Server is running on port ${port}`); 
});