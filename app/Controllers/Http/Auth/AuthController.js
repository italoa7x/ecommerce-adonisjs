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
      return response.status(201).send({ data: user })
    } catch (error) {
      await trx.rollback()
      return response.status(400).send({
        message: "Erro ao criar um usuário",
      })
    }
  }

  async login({ request, response, auth }) {
    const { email, password } = request.all()

    try {
      const data = await auth.withRefreshToken().attempt(email, password)
      return data
    } catch (error) {
      return response.status(401).send({
        message: "Erro ao realizar o login",
      })
    }
  }

  async refresh({ request, response, auth }) {
    let refresh_token = request.input("refresh_token")
    if (!refresh_token) {
      refresh_token = request.header("refresh_token")
    }
    const user = await auth
      .newRefreshToken()
      .generateForRefreshToken(refresh_token)
    return response.send(user)
  }

  async logout({ request, response, auth }) {
    let refresh_token = request.input("refresh_token")
    if (!refresh_token) {
      refresh_token = request.header("refresh_token")
    }

    await auth.authenticator("jwt").revokeTokens([refresh_token, true])
    return response.status(204).send()
  }

  async forgot({ request, response, auth }) {}

  async remember({ request, response }) {}

  async reset({ request, response }) {}
}

module.exports = AuthController
