import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  await knex.raw('CREATE EXTENSION IF NOT EXISTS "uuid-ossp";');

  await knex.schema.createTable('event', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('NOW()'));
  });

  await knex.schema.createTable('event_user', table => {
    table.uuid('id').primary().defaultTo(knex.raw('uuid_generate_v4()'));
    table.text('name').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('NOW()'));
  });

  await knex.schema.createTable('event_date', table => {
    table.uuid('event_id').references('id').inTable('event').notNullable();
    table.date('date');
  });

  await knex.schema.createTable('vote', table => {
    table.uuid('event_id').references('id').inTable('event');
    table.uuid('user_id').references('id').inTable('event_user');
    table.date('date').notNullable();
    table.timestamp('created_at').defaultTo(knex.raw('NOW()'));
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('event_date');
  await knex.schema.dropTable('vote');
  await knex.schema.dropTable('event_user');
  await knex.schema.dropTable('event');
}
