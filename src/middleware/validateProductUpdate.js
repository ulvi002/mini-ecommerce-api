const Category = require("../models/category.m")

const validateProductUpdate = async (req, res, next) => {
    try {
        const { name, price, category } = req.body;

        if(name !== undefined && name.trim() === "") {
            return res.status(400).json({ message: "Name cannot be empty" })
        }

        if(price !== undefined) {
            const priceNumber = Number(price)

            if(isNaN(priceNumber)){
                return res.status(400).json({ message: "Price must be number" })
            }

            if(priceNumber <= 0) {
                return res.status(400).json({
                message: "Price must be greater than 0" })
            }
            
            req.body.price = priceNumber
        }


        if(category !== undefined) {
            const categoryExists = Category.findById(category)
            if(!categoryExists){
                return res.status(404).json({ message: "Invalid category ID" })
            }
        }

        next()

    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


module.exports = validateProductUpdate