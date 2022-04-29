const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;

//connect MongoDB
const connectDB = require("./config/db");
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  // res.send("Hello World");
  res.status(200).json({ message: "Welcome to the Dish Guru API" });
});

//Routes
app.use("/api/users/", require("./routes/userRoutes"));
app.use("/api/", require("./routes/dishRoutes"));
app.use("/api/my-dishes/:dishId/reviews/", require("./routes/reviewRoutes"));
app.use("/api/dishes/:dishId/reviews/", require("./routes/reviewRoutes"));

//error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}:`);
});
