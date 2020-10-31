"use strict"
/** @type {typeof import('@adonisjs/framework/src/Route/Manager')} */
const Route = use("Route")

Route.group(() => {
  //lista os produtos
  Route.get("/products", "ProductController.index")
  Route.get("/produts/:id", "ProductController.show")
  //lista as orders de pedido do usuario
  Route.get("/orders", "OrderController.index")
  Route.get("/orders/:id", "OrderController.show")
  Route.post("/orders", "OrderController.store")
  Route.put("/orders/:id", "OrderController.put")
})
  .prefix("v1")
  .namespace("Client")
  .middleware("auth")
