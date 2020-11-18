"use strict"
const Product = use("App/Models/Product")
const Database = use("Database")
class ProductController {
  async index({ request, pagination }) {
    const name = request.input("name")

    const query = Product.query()
    if (name) {
      query.where("name", "LIKE", `%${name}%`)
    }
    const categories = await query.paginate(pagination.page, pagination.limit)
    return categories
  }

  async store({ request, response }) {
    const transaction = await Database.beginTransaction()
    try {
      const { name, price, image_id, description } = request.all()

      const product = await Product.create(
        {
          name,
          price,
          description,
          image_id,
        },
        null,
        transaction
      )
      transaction.commit()

      if (product) {
        return response.send(product)
      }
    } catch (error) {
      transaction.rollback()
      return response.status(400).send({
        message: "Erro ao cadastrar produto",
      })
    }
  }

  async update({ request, response, params: { id } }) {
    const { name, price, description, image_id } = request.all()
    const product = await Product.findByOrFail("id", id)

    product.merge({
      name,
      price,
      description,
      image_id,
    })
    await product.save()

    return response.status(200).send(product)
  }

  async destroy({ params: { id }, response }) {
    const product = await Product.findByOrFail("id", id)
    await product.delete()
    return response.status(204).send()
  }
}

module.exports = ProductController
