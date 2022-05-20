import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormKeluhanGas extends BaseSchema {
  protected tableName = 'form_keluhan_gas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('user_id').unsigned().references('users.id')
      table.integer('role_id').unsigned().references('roles.id')
      table.integer('dept_id').unsigned().references('depts.id')
      table.text('notes', 'longtext')
      table.string('image', 180)
      table.enum('status',['true','false']).defaultTo(null)
      table.enum('agree',['true','false']).defaultTo('true')
      /**
       * Uses timestamptz for PostgreSQL and DATETIME2 for MSSQL
       */
      table.timestamp('created_at', { useTz: true })
      table.timestamp('updated_at', { useTz: true })
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
