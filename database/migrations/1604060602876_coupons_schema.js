"use strict"

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema")

class CouponsSchema extends Schema {
  up() {
    this.create("coupons", table => {
      table.increments()
      table.string("code", 100).notNullable()
      table.dateTime("valid_from")
      table.dateTime("valid_into")
      table.integer("quantity").defaultTo(1)
      table.enum("can_use_for", ["product", "client", "product_client", "all"])
      table.enum("type", ["free", "percent", "currency"]).defaultTo("currency")
      table.boolean("recursive").defaultTo(false)
      table.timestamps()
    })
  }

  down() {
    this.drop("coupons")
  }
}

module.exports = CouponsSchema
