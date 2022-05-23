import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Role from 'App/Models/Role'

export default class RoleSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Role.createMany([
      {
        rolename: 'Superadmin'
      },
      {
        rolename: 'Direktur'
      },
      {
        rolename: 'Manager'
      },
      {
        rolename: 'Ass Manager'
      },
      {
        rolename: 'Supervisor'
      },
      {
        rolename: 'Staff'
      },
    ])
  }
}
