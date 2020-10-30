"use strict"

/*
|--------------------------------------------------------------------------
| Factory
|--------------------------------------------------------------------------
|
| Factories are used to define blueprints for database tables or Lucid
| models. Later you can use these blueprints to seed your database
| with dummy data.
|
*/

/** @type {import('@adonisjs/lucid/src/Factory')} */
// const Factory = use('Factory')

Factory.blueprint("App/Models/User", faker => {
  return {
    name: faker.first({ nationality: "us" }),
    surname: fake.last(),
    email: faker.email({ domain: "gmail.com" }),
    password: "secret",
  }
})

Factory.blueprint("App/Models/Category", faker => {
  return {
    title: faker.country({ fulll: true }),
    description: faker.sentence(),
  }
})

Faker.blueprint("App/Models/Product", faker => {
  return {
    name: faker.animal({ type: "forest" }),
    description: faker.sentence(),
    price: faker.floating({ min: 0, max: 1000, fixed: 2 }),
  }
})
