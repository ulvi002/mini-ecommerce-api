const Category = require("../models/category.m")

const createCategory = async (req, res) => {
    const category = await Category.create(req.body)
    res.json(category)
}

const getCategories = async (req, res) => {
    const categories = await Category.find()
    res.json(categories)
}


module.exports = { createCategory, getCategories }