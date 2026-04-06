const Category = require("../models/category.m");

const validateProduct = async (req, res, next) => {
    try {
        const { name, price, category } = req.body;

        if(!name) {
            return res.status(400).json({ message: "Name is reqired" })
        }

        if(price == null) {
            return res.status(400).json({ message: "Price is required" })
        }
        
        const priceNumber = Number(price)
        if(isNaN(priceNumber)) {
            return res.status(400).json({ message: "Price must be a number" })
        }

        if(priceNumber <= 0){
            return res.status(400).json({
                 message: "Price must be greater than 0" })
        }

        if(!category) {
            return res.status(400).json({ message: "Category is required" })
        }

        const  categoryExists = await Category.findById(category)
        if(!categoryExists){
            return res.status(400).json({ message: "Invaldi category ID" })
        } 

        req.body.price = priceNumber

        next()
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}   

module.exports = validateProduct