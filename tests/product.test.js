const request = require("supertest")
const app = require("../app")
const mongoose = require("mongoose")

describe("Product API tests", () => {

    let token;

    beforeEach( async () => {
      
        const user = {
            name: "User test",
            email: `test${Date.now()}@gmail.com`,
            password: "password123"
        }
        await request(app)
        .post("/api/auth/register")
        .send(user)

        const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: user.email,
            password: user.password
        })

        token = res.body.token
    });

    afterEach( async () => {
        await mongoose.connection.dropDatabase()
    })

    test("Should create product successfully", async () => {
       const res = await request(app)
       .post("/api/products")
       .set("Authorization", `Bearer ${token}`)
       .send({
        name: "Samsung S26",
        price: 2000,
        description: "Samsung phone"
       })

       expect(res.statusCode).toBe(201);
       expect(res.body.product).toBeDefined();
       expect(res.body.product._id).toBeDefined();
    })

    
    test("should fail if product name empty", async () => {
        const res = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "",
            price: 2000,
            description: "Samsung phone"
        })

        expect(res.statusCode).toBe(400)
    })


    test("Should get all products", async () => {
        const res = await request(app)
        .get("/api/products")
    

      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body.products)).toBe(true);
      })


      test("Should  delete product", async () => {
        const createRes = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "Test product",
            price: 2000
        })

        const productId = createRes.body.product._id

        const res = await request(app)
        .delete(`/api/products/${productId}`)
        .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(200)
      })


     test("Should fail delete if product not found", async () => {
        const fakeId = "507f1f77bcf86cd799439011";

        const res = await request(app)
        .delete(`/api/products/${fakeId}`)
        .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(404)
     })

     test("Should fail delete if product id is invalid", async () => {
        const invalidId = "412421jdjd"

        const res = await request(app)
        .delete(`/api/products/${invalidId}`)
        .set("Authorization", `Bearer ${token}`)

        expect(res.statusCode).toBe(400) 
     
     })

     test("Should fail if user not authorized", async () => {
        const createRes = await request(app)
        .post("/api/products")
        .set("Authorization", `Bearer ${token}`)
        .send({
            name: "test product",
            price: 2000,
            description: "Peace product"
        })

        const productId = createRes.body.product._id

        const res = await request(app)
        .delete(`/api/products/${productId}`)


        expect(res.statusCode).toBe(401)
        })

    })

    afterAll( async () => {
     await mongoose.connection.close()
    })




    