"use strict"
const Category = use("App/Models/Category")
const Database = use("Database")
class CategoryController {
  async index({ request, response, pagination }) {
    const title = request.input("title")

    const query = Category.query()
    if (title) {
      query.where("title", "LIKE", `%${title}%`)
    }
    const categories = await query.paginate(pagination.page, pagination.limit)
    return categories
  }

  async store({ request, response }) {
    const transaction = await Database.beginTransaction()
    try {
      const { title, description, image_id } = request.all()

      const category = await Category.create(
        {
          title,
          description,
          image_id,
        },
        null,
        transaction
      )
      transaction.commit()
      if (category) {
        return category
      }
    } catch (error) {
      transaction.rollback()
      return response.status(400).send({
        message: "Erro ao salvar categoria",
      })
    }
  }

  async show({ params: { id }, response }) {
    const category = await Category.findByOrFail("id", id)
    return response.send(category)
  }

  async update({ params: { id }, request, response }) {
    const { title, description, image_id } = request.all()

    const category = await Category.findByOrFail("id", id)

    category.merge({ title, description, image_id })
    await category.save()
    return response.status(200).send(category)
  }

  async destroy({ params: { id }, response }) {
    const category = await Category.findByOrFail("id", id)
    await category.delete()
    return response.status(204).send()
  }
}

module.exports = CategoryController
