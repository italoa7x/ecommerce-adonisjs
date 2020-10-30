"use strict"

/** @type {import('@adonisjs/lucid/src/Schema')} */
const Schema = use("Schema")

class ProductSchema extends Schema {
  up() {
    this.create("products", table => {
      table.increments()
      table.string("name", 255)
      table.decimal("price", 12, 2)
      table
        .integer("image_id")
        .unsigned()
        .references("id")
        .inTable("images")
        .onDelete("CASCADE")

      table.string("description", 255)
      table.timestamps()
    })

    this.create("image_product", table => {
      table.increments()
      table
        .integer("image_id")
        .unsigned()
        .references("id")
        .inTable("images")
        .onDelete("CASCADE")

      table
        .integer("product_id")
        .unsigned()
        .references("id")
        .inTable("products")
        .onDelete("CASCADE")
      table.timestamp()
    })
  }

  down() {
    this.drop("products")
    this.drop("image_product")
  }
}

module.exports = ProductSchema
