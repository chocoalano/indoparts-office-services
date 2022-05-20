import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class FormPpApprovals extends BaseSchema {
  protected tableName = 'form_pp_approvals'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')
      table.integer('form_pp_id').unsigned().references('form_pps.id')
      table.integer('pemohon_user_id').unsigned().references('users.id')
      table.string('pemohon_signature')
      table.integer('admin_user_id').unsigned().references('users.id')
      table.string('admin_signature')
      table.integer('mengetahui_user_id').unsigned().references('users.id')
      table.string('mengetahui_signature')
      table.integer('disetujui_user_id').unsigned().references('users.id')
      table.string('disetujui_signature')
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
