# 🛒 Mini E-Commerce API

A backend API that models a real-world e-commerce system, covering the full flow from product discovery to order completion.

The project focuses on implementing practical backend logic, including authentication, cart handling, order processing, and a simulated payment flow.

---

## 🚀 Features

### 👤 Authentication & Authorization

* JWT-based authentication
* Protected routes
* Role-based access (User / Admin)

### 📦 Product & Category Management

* Full CRUD operations for products
* Category-based organization
* Product-category relation with populate
* Image upload support

### 🔍 Search & Filtering

* Search products by name
* Filter by category and price range
* Sorting (ascending / descending)
* Pagination support

### 🛒 Cart System

* User-specific cart
* Add, remove, and update product quantities

### 📄 Order System

* Create orders from cart data
* Order status lifecycle:

  * pending → paid → delivered
* User order history
* Admin access to all orders

### 💳 Payment (Mock)

* Simulated payment endpoint
* Updates order status accordingly

### ⚠️ Error Handling & Validation

* Centralized error handling
* Input validation
* Consistent HTTP responses

---

## 🔗 API Overview

* Auth → `/api/auth`
* Users → `/api/users`
* Products → `/api/products`
* Categories → `/api/categories`
* Cart → `/api/carts`
* Orders → `/api/orders`

---

## 🌐 Deployment

Ready for deployment on platforms such as Render or Railway.

---

## 👨‍💻 Author

Built as a personal backend project to demonstrate real-world API design, authentication, and business logic implementation.
