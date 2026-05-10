const { client } = require("../config/redis")
const Product = require("../models/product.m")

async function getProductsService(query) {

    const key = `products_${JSON.stringify(query)}`;

    const cachedData = await client.get(key)

    if(cachedData) {
        console.log("From redis")
        return JSON.parse(cachedData)
    }

    const filter = {}

    if(query.category){
        filter.category = query.category
    }

    if(query.search){
        filter.name = { $regex: query.search, $options: "i" }
    }

     if (query.minPrice || query.maxPrice) {
    filter.price = {};

    if (query.minPrice) {
      filter.price.$gte = Number(query.minPrice);
    }

    if (query.maxPrice) {
      filter.price.$lte = Number(query.maxPrice);
    }
  }

    const page = Number(query.page) || 1;
  const limit = Number(query.limit) || 10;
  const skip = (page - 1) * limit;

  let sort = {};
  if (query.sort) {
    sort[query.sort] = 1;
  }

    const products = await Product.find(filter)
    .populate("category")
    .sort(sort)
    .skip(skip)
    .limit(limit);

  await client.set(key, JSON.stringify(products), {
    EX: 60
  });

  console.log("FROM DATABASE 🗄️");

  return products;
}

module.exports = { getProductsService }