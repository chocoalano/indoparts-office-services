import BaseSchema from '@ioc:Adonis/Lucid/Schema'

export default class UserOnlines extends BaseSchema {
  protected tableName = 'user_onlines'

  public async up () {
    this.schema.createTable(this.tableName, (table) => {
      table.integer('user_id').unsigned()
      table.enum('online',['true','false']).defaultTo('true')
    })
  }

  public async down () {
    this.schema.dropTable(this.tableName)
  }
}
