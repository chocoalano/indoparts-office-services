import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const user = new User()
    user.role_id = 1
    user.dept_id = 1
    user.name = 'testing'
    user.nik = '001'
    user.password = '123456'
    user.activation = 'true'
    user.avatar = 'testing.png'
    await user.save()
  }
}
