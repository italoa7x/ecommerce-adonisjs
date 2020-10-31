"use strict"

/*
|--------------------------------------------------------------------------
| ClientSeeder
|--------------------------------------------------------------------------
|
| Make use of the Factory instance to seed database with dummy data or
| make use of Lucid models directly.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
const Factory = use("Factory")
const Role = use("Role")
const User = use("App/Models/User")

class ClientSeeder {
  async run() {
    const role = await Role.findBy("slug", "client")
    const clientes = await Factory.model("App/Models/User").createMany(30)
    await Promise.all(clientes.map((c) => {
      await c.roles().attach([role.id])
    }))
    
    const user = await User.create({
      name: 'italo',
      surname: 'alves',
      email: 'italo@gmail.com',
      password: 'secret'
    })

    const adminRole = await Role.findBy('slug', 'admin')

    await user.roles().attach([role.id])
  }

}

module.exports = ClientSeeder
