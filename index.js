const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const cors = require("cors");
// const authRoutes = require("./routes/authRoutes");
const cookieParser = require("cookie-parser");
const { errorHandler } = require("./middlewares");
const { categoryRoute, productRoute } = require("./routes/v1");

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(cookieParser());
app.use(express.json());

app.use("/api/v1/categories", categoryRoute);
app.use("/api/v1/products", productRoute);

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
