import { BaseModel, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import User from './User'

export default class UserOnline extends BaseModel {
  @column({ isPrimary: true })
  public user_id: number

  @column()
  public online: string

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user_online: BelongsTo<typeof User>
}
