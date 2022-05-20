import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormSpps extends BaseSchema {
  protected tableName = 'form_spps'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('pengadaan_barang_keluhan_ga_id').unsigned().references('pengadaan_barang_keluhan_gas.id')
      table.enum('status',['lokal','bod']).defaultTo(null)
      table.string('no_spp', 100).notNullable()
      table.string('company_name', 100).notNullable()
      table.string('title', 100).notNullable()
      table.integer('user_id').unsigned().references('users.id')
      table.integer('dept_id').unsigned().references('depts.id')
      table.string('prihal', 100).notNullable()
      table.date('tanggal').notNullable()
      table.double('estimasi_biaya').notNullable()
      table.text('content', 'longtext')
      table.date('tanggal_disahkan').notNullable()
      table.text('saran', 'longtext')
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
