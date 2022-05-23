import { BaseModel, beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import FormKeluhanGa from './FormKeluhanGa'
import Notification from './Notification'
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
  @belongsTo(() => FormKeluhanGa, {
    foreignKey: 'user_id',
  })
  public form_keluhan_ga: BelongsTo<typeof FormKeluhanGa>

  @beforeSave()
  public static async AddNotification(user: User, on: UserOnline) {
    if (on) {
      await Notification.create({
        user_id: user.id,
        from: user.id,
        to: 0,
        note_action: `${user.name} online`,
        path_link: on.online === 'true'? '/login':'/logout',
        method: 'post',
        param: '',
        read: 'false',
      }) 
    }
  }
}
