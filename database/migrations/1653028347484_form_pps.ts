import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormPps extends BaseSchema {
  protected tableName = 'form_pps'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('pengadaan_barang_keluhan_ga_id').unsigned().references('pengadaan_barang_keluhan_gas.id')
      table.string('no_pp', 100).notNullable()
      table.date('tanggal').notNullable()
      table.integer('dept_id').unsigned().references('depts.id')
      table.string('keperluan', 180).notNullable()
      table.text('referensi', 'longtext').notNullable()
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
