const Product = require("../models/product.m")
const Category = require("../models/category.m")


const createProduct = async (req, res) => {
    try {

        console.log("REQ BODY:", req.body);
        console.log("REQ FILE:", req.file);
        
        const { name, price, description } = req.body

        const imageUrl = req.file ? req.file.path : null;

        const product = await Product.create({
            name,
            price,
            description,
            category: req.body.category, 
            imageUrl
            
            
        })
        
        res.status(201).json({
            success: true,
            message: "Product created",
            data: product         
        })
    } catch (error) {
        res.status(500).json({ error:error.message }); 
    }
} 


const getProducts = async (req, res) => {
    try {
        const filter = {}

        if(req.query.category){
            filter.category = req.query.category;
        }

        if(req.query.search) {
            filter.name = { $regex: req.query.search, $options: "i"}
        }

        const page = Number(req.query.page) || 1
        const limit = Number(req.query.limit) || 10

        const skip = (page - 1) * limit

        if(req.query.minPrice || req.query.maxPrice) {
            filter.price = {}

            if(req.query.minPrice){
                filter.price.$gte = Number(req.query.minPrice)
            }

            if(req.query.maxPrice){
                filter.price.$lte = Number(req.query.maxPrice)
            }
        }


        let sort = {}

        if(req.query.sort){
            sort[req.query.sort] = 1
        }

        const products = await Product.find(filter)
        .populate("category")
        .sort(sort)
        .skip(skip)
        .limit(limit)
        
        res.status(200).json({ products })
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const getProduct = async (req, res) => {
    try {
        const product = await Product.findById(req.params.id).populate("category");
        if(!product) return res.status(404).json({ message: "Product not found" });
        res.status(200).json({ product });
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const updateProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndUpdate(
            req.params.id, req.body, { new:true }
        ).populate("category");
            
        if(!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product updated", product });    
 
    } catch (error) {
        res.status(500).json({ error: error.message })
    }
}


const deleteProduct = async (req, res) => {
    try {
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product) return res.status(404).json({ message: "Product not found" });
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ error: error.message })
        
    }
}

module.exports = { createProduct, getProducts, getProduct, updateProduct, deleteProduct }