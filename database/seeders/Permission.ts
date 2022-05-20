import BaseSeeder from '@ioc:Adonis/Lucid/Seeder'
import Permission from 'App/Models/Permission'

export default class PermissionSeeder extends BaseSeeder {
  public async run () {
    // Write your database queries inside the run method
    const permissionname = [
      {
        name: 'create-user',
        basepermission: 'user'
      },
      {
        name: 'read-user',
        basepermission: 'user'
      },
      {
        name: 'update-user',
        basepermission: 'user'
      },
      {
        name: 'delete-user',
        basepermission: 'user'
      },
      {
        name: 'create-role',
        basepermission: 'role'
      },
      {
        name: 'read-role',
        basepermission: 'role'
      },
      {
        name: 'update-role',
        basepermission: 'role'
      },
      {
        name: 'delete-role',
        basepermission: 'role'
      },
      {
        name: 'create-permission',
        basepermission: 'permission'
      },
      {
        name: 'read-permission',
        basepermission: 'permission'
      },
      {
        name: 'update-permission',
        basepermission: 'permission'
      },
      {
        name: 'delete-permission',
        basepermission: 'permission'
      },
      {
        name: 'create-dept',
        basepermission: 'dept'
      },
      {
        name: 'read-dept',
        basepermission: 'dept'
      },
      {
        name: 'update-dept',
        basepermission: 'dept'
      },
      {
        name: 'delete-dept',
        basepermission: 'dept'
      },
    ]
    await Permission.createMany(permissionname)
  }
}
