"use strict"

const OrderitemHook = (exports = module.exports = {})
const Product = use("App/Models/Product")

OrderitemHook.updateSubtotal = async model => {
  let product = await Product.find(model.product_id)
  model.suttotal = model.quantity * product.price
}
