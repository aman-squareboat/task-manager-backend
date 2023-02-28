/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const migration = await knex.schema.createTable("tasks", function (table) {
        table.bigIncrements("id");
        table.string("ulid");
        table.timestamp('eta');
        table.timestamp('created_at');
        table.timestamp('updated_at');
        table.string('title');
        table.integer('status')
      });
      return migration;
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema.dropSchemaIfExists("tasks")
};
