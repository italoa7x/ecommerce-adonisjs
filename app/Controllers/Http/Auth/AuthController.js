"use strict"
const Database = use("Database")
const User = use("App/Models/User")
const Role = use("Role")
class AuthController {
  async register({ request, response }) {
    const trx = await Database.beginTransaction()

    try {
      const { name, surname, email, password } = request.all()

      const user = await User.create({ name, surname, email, passsword }, trx)

      const roleClient = await Role.findBy("slug", "client")

      await user.roles().attach([roleClient.id], null, trx)

      await trx.commit()
    } catch (error) {
      await trx.rollback()
    }
  }

  async login({ request, response, auth }) {}

  async refresh({ reques, response, auth }) {}

  async logout({ request, response, auth }) {}

  async forgot({ request, response, auth }) {}

  async remember({ request, response }) {}

  async reset({ request, response }) {}
}

module.exports = AuthController
