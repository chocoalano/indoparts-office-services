import { DateTime } from 'luxon'
import Hash from '@ioc:Adonis/Core/Hash'
import { column, beforeSave, BaseModel,  belongsTo, BelongsTo, hasOne, HasOne } from '@ioc:Adonis/Lucid/Orm'
import Role from './Role'
import Dept from './Dept'
import UserOnline from './UserOnline'

export default class User extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public role_id: number
  
  @column()
  public dept_id: number

  @column()
  public name: string
  
  @column()
  public nik: string

  @column({ serializeAs: null })
  public password: string

  @column()
  public activation?: string

  @column()
  public avatar: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async hashPassword (user: User) {
    if (user.$dirty.password) {
      user.password = await Hash.make(user.password)
    }
  }

  @hasOne(() => UserOnline)
  public user_online: HasOne<typeof UserOnline>

  @belongsTo(() => Role, {
    foreignKey: 'role_id',
  })
  public roles: BelongsTo<typeof Role>
  @belongsTo(() => Dept, {
    foreignKey: 'dept_id',
  })
  public dept: BelongsTo<typeof Dept>
}
