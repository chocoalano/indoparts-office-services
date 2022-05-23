import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import User from 'App/Models/User'

export default class UserSeeder extends BaseSeeder {
  public async run() {
    // Write your database queries inside the run method
    await User.createMany([
      {
        role_id: 1,
        dept_id: 1,
        name: 'Superadmin',
        nik: '001',
        password: '123456',
        activation: 'true',
        avatar: 'testing.png',
      },
      {
        role_id: 2,
        dept_id: 1,
        name: 'Direktur',
        nik: '002',
        password: '123456',
        activation: 'true',
        avatar: 'testing.png',
      },
      {
        role_id: 3,
        dept_id: 2,
        name: 'Manager IT',
        nik: '003',
        password: '123456',
        activation: 'true',
        avatar: 'testing.png',
      },
      {
        role_id: 3,
        dept_id: 3,
        name: 'Manager HRD',
        nik: '004',
        password: '123456',
        activation: 'true',
        avatar: 'testing.png',
      },
      {
        role_id: 5,
        dept_id: 4,
        name: 'Supervisor GA',
        nik: '005',
        password: '123456',
        activation: 'true',
        avatar: 'testing.png',
      },
      {
        role_id: 6,
        dept_id: 6,
        name: 'Staff Test',
        nik: '001',
        password: '123456',
        activation: 'true',
        avatar: 'testing.png',
      }
    ])
  }
}
