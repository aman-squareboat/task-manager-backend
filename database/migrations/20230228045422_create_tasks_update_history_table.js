/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function(knex) {
  const migration = await knex.schema.createTable("tasks_update_history", function (table) {
        table.bigIncrements("id");
        table.string("ulid");
        table.bigInteger("task_id")
        table.string('updated_from_status');
        table.string('updated_to_status');
        table.timestamp("updated_at");
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
