import { DateTime } from 'luxon'
import { BaseModel, beforeSave, BelongsTo, belongsTo, column } from '@ioc:Adonis/Lucid/Orm'
import Notification from './Notification'
import Role from './Role'
import User from './User'
import Dept from './Dept'

export default class FormKeluhanGa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number
  @column()
  public role_id: number
  @column()
  public dept_id: number
  @column()
  public notes: string
  @column()
  public image: string
  @column()
  public status: string
  @column()
  public agree: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @belongsTo(() => User, {
    foreignKey: 'user_id',
  })
  public user: BelongsTo<typeof User>
  @belongsTo(() => Role, {
    foreignKey: 'user_id',
  })
  public role: BelongsTo<typeof Role>
  @belongsTo(() => Dept, {
    foreignKey: 'user_id',
  })
  public dept: BelongsTo<typeof Dept>

  @beforeSave()
  public static async AddNotification(post: FormKeluhanGa) {
    const jabatan = await Role.findBy('rolename', 'Supervisor GA')
    const user = await User.find(post.user_id)
    await Notification.create({
      user_id: post.user_id,
      from: post.user_id,
      to: jabatan?.id,
      note_action: `${user?.name} menginfokan laporan keluhan, mungkin pembuatan/pembaharuan, silahkan cek.`,
      path_link: '/keluhan-ga',
      method: '',
      param: '',
      read: 'false',
    })
  }
}
