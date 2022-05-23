import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Dept from 'App/Models/Dept'

export default class DeptSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    await Dept.createMany([
      {
        deptname: 'ALL'
      },
      {
        deptname: 'IT'
      },
      {
        deptname: 'HRD'
      },
      {
        deptname: 'GA'
      },
      {
        deptname: 'Marketing'
      },
      {
        deptname: 'Finance'
      },
    ])
  }
}
