const express = require("express")
const mongoose = require("mongoose")
require("dotenv").config()

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"))

const authRoutes = require("./src/routes/auth.r")
app.use("/api/auth", authRoutes)

const productRoutes = require("./src/routes/product.r")
app.use("/api/products", productRoutes)

const userRoutes = require("./src/routes/user.r")
app.use("/api/users", userRoutes)

const cartRoutes = require("./src/routes/cart.r")
app.use("/api/carts", cartRoutes)

const orderRoutes = require("./src/routes/order.r")
app.use("/api/orders", orderRoutes)

const categoryRoutes = require("./src/routes/category.r")
app.use("/api/categories", categoryRoutes);

app.get("/", (req,res) => {
    res.send("Hello guys");
})


const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGO_URL)
.then(() => {
    console.log("MongoDB connected")

    app.listen(PORT, () => {
        console.log(`server running on port ${PORT}`)
    })
})
.catch(err => console.log(err))


