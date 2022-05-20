import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormSppDiajukans extends BaseSchema {
  protected tableName = 'form_spp_diajukans'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('form_spp_id').unsigned().references('form_spps.id')
      table.integer('user_id').unsigned().references('users.id')
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
