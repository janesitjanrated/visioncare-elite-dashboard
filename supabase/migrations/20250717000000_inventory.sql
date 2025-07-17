import { Knex } from 'knex';

export async function up(knex: Knex): Promise<void> {
  // Create products table
  await knex.schema.createTable('products', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.string('name').notNullable();
    table.text('description');
    table.string('sku').notNullable().unique();
    table.uuid('categoryId').references('id').inTable('categories');
    table.string('unit').notNullable();
    table.decimal('minStockLevel').notNullable();
    table.decimal('maxStockLevel').notNullable();
    table.decimal('reorderPoint').notNullable();
    table.decimal('costPrice').notNullable();
    table.decimal('sellingPrice').notNullable();
    table.string('barcode');
    table.uuid('organizationId').notNullable().references('id').inTable('organizations');
    table.timestamps(true, true);
  });

  // Create stocks table
  await knex.schema.createTable('stocks', (table) => {
    table.uuid('id').primary().defaultTo(knex.raw('gen_random_uuid()'));
    table.uuid('productId').notNullable().references('id').inTable('products');
    table.uuid('branchId').notNullable().references('id').inTable('branches');
    table.decimal('quantity').notNullable().defaultTo(0);
    table.uuid('locationId').references('id').inTable('locations');
    table.uuid('organizationId').notNullable().references('id').inTable('organizations');
    table.timestamps(true, true);

    table.unique(['productId', 'branchId', 'locationId']);
  });
}

export async function down(knex: Knex): Promise<void> {
  await knex.schema.dropTable('stocks');
  await knex.schema.dropTable('products');
}
