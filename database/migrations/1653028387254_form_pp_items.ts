import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormPpItems extends BaseSchema {
  protected tableName = 'form_pp_items'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('form_pp_id').unsigned().references('form_pps.id')
      table.string('nama', 100).notNullable()
      table.string('spesifikasi', 100).notNullable()
      table.string('supplier', 100)
      table.string('satuan', 10).notNullable()
      table.integer('qty', 10).notNullable()
      table.string('keterangan', 10)
      table.string('realisasi', 10)
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
