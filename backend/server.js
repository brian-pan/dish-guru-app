const path = require("path");
const express = require("express");
const dotenv = require("dotenv").config();
const colors = require("colors");
const { errorHandler } = require("./middleware/errorMiddleware");
const PORT = process.env.PORT || 5000;

//connect MongoDB
const connectDB = require("./config/db");
const { sendfile } = require("express/lib/response");
connectDB();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Routes
app.use("/api/users/", require("./routes/userRoutes"));
app.use("/api/", require("./routes/dishRoutes"));
app.use("/api/my-dishes/:dishId/reviews/", require("./routes/reviewRoutes"));
app.use("/api/dishes/:dishId/reviews/", require("./routes/reviewRoutes"));

//Serve Frontend
if (process.env.NODE_ENV === "production") {
  //set build folder as static folder
  app.use(express.static(path.join(__dirname, "../frontend/build")));

  app.get("*", (req, res) =>
    res.sendFile(__dirname, "../", "frontend", "build", "index.html")
  );
} else {
  app.get("/", (req, res) => {
    // res.send("Hello World");
    res.status(200).json({ message: "Welcome to the Dish Guru API" });
  });
}

//error handler
app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}:`);
});
