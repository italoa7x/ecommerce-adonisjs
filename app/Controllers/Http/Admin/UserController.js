"use strict"
const User = use("App/Models/User")
const Database = use("Database")
class UserController {
  async store({ request, response }) {
    const transaction = await Database.beginTransaction()
    try {
      const { name, email, password, surname, image_id } = request.all()
      const user = await User.create(
        {
          name,
          surname,
          email,
          password,
          image_id,
        },
        null,
        transaction
      )
      transaction.commit()

      if (user) {
        return response.send(user)
      }
    } catch (error) {
      transaction.rollback()
      return response.status(400).send({
        message: "Erro ao salvar usuário",
      })
    }
  }

  async index({ request, response, pagination }) {
    const query = User.query()

    const name = request.input("name")

    if (name) {
      query.where("name", "LIKE", `%${name}%`)
    }
    const users = await query.paginate(pagination.page, pagination.limit)

    return response.send(users)
  }

  async update({ request, params: { id }, response }) {
    const user = await User.findByOrFail("id", id)
    const { name, surname, email, password, image_id } = request.all()

    user.merge({
      name,
      surname,
      email,
      password,
      image_id,
    })

    await user.save()
    return response.status(200).send(user)
  }

  async destroy({ response, params: { id } }) {
    const user = await User.findByOrFail("id", id)
    await user.delete()
    return response.status(204).send()
  }
}

module.exports = UserController
