"use strict"
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route")

Route.group(() => {
  Route.resource("/categories", "CategoriaController").apiOnly()

  Route.resource("/products", "ProductController").apiOnly()
  Route.resource("/images", "ImageController").apiOnly()
  Route.resource("/orders", "OrderController").apiOnly()
  Route.resource("/users", "UserController").apiOnly()
  Route.resource("/coupons", "CouponController").apiOnly()
})
  .prefix("v1/admin")
  .namespace("Admin")
  .middleware("auth")