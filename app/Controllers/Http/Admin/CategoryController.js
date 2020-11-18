"use strict"
const Category = use("App/Models/Category")

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

  async create({ request, response }) {}

  async show({ request, response }) {}

  async update({ request, response }) {}

  async destroy({ request, response }) {}
}

module.exports = CategoryController
