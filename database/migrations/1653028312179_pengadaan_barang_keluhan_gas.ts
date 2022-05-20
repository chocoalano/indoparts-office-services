import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class PengadaanBarangKeluhanGas extends BaseSchema {
  protected tableName = 'pengadaan_barang_keluhan_gas'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('form_keluhan_ga_id').unsigned().references('form_keluhan_gas.id')
      table.enum('jenis_form',['pp','spp']).defaultTo(null)
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
