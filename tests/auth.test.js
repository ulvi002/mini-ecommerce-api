const request = require("supertest");
const app = require("../app")

let testUser = {}

describe("AUTH api tests", () => {

   beforeEach( () => {
      testUser = {
        email:  `test${Date.now()}@gmail.com`,
        password: "password123"
      }
   })

    afterEach( async () => {
        await mongoose.connection.dropDatabase()
    })   



   test("should register user succesfully", async () => {

    const res = await request(app)
    .post("/api/auth/register")
    .send({
        name: "test user",
        email: testUser.email,
        password: testUser.password
    })

    expect(res.statusCode).toBe(201);
    expect(res.body.user).toBeDefined()
    expect(res.body.token).toBeDefined()
   })


   test("should fail if email already exists", async () => {

  
        await request(app)
        .post("/api/auth/register")
        .send({
            name: "test user",
            email: testUser.email,
            password: testUser.password
        })

        const res = await request(app)
        .post("/api/auth/register")
        .send({
            name: "test user",
            email: testUser.email,
            password: testUser.password
        })

        expect(res.statusCode).toBe(400)
    })

   


   test("should login process successfully", async () => {
    
    
        await request(app)
        .post("/api/auth/register")
        .send({
            name: "test user",
            email: testUser.email,
            password: testUser.password
        })

        const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: testUser.email,
            password: testUser.password
        })

        expect(res.statusCode).toBe(200)
        expect(res.body.token).toBeDefined()
    })


    test("should fail with wrong password", async () => {
        
        await request(app)
        .post("/api/auth/register")
        .send({
            name: "test user",
            email: testUser.email,
            password: testUser.password
        })

        const res = await request(app)
        .post("/api/auth/login")
        .send({
            email: testUser.email,
            password: "wrong_password"
        })

        expect(res.statusCode).toBe(401)

    })

        
    
    })   


    afterAll( async () => {
    await mongoose.connection.close()
    })







