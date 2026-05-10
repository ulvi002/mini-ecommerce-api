const express = require("express");
const app = express();

const { connectRedis } = require("./src/config/redis")
connectRedis()

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));


const authRoutes = require("./src/routes/auth.r");
const productRoutes = require("./src/routes/product.r");
const userRoutes = require("./src/routes/user.r");
const cartRoutes = require("./src/routes/cart.r");
const orderRoutes = require("./src/routes/order.r");
const categoryRoutes = require("./src/routes/category.r");

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/users", userRoutes);
app.use("/api/carts", cartRoutes);
app.use("/api/orders", orderRoutes);
app.use("/api/categories", categoryRoutes);


app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;