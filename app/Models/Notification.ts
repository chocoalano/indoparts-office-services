import { DateTime } from 'luxon'
import { BaseModel, beforeSave, column } from '@ioc:Adonis/Lucid/Orm'
import Ws from 'App/Services/Ws'
import User from './User'

export default class Notification extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public user_id: number
  @column()
  public from: number
  @column()
  public to: number
  @column()
  public note_action: string
  @column()
  public path_link: string
  @column()
  public method: string
  @column()
  public param: string
  @column()
  public read: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime

  @beforeSave()
  public static async Broadcast(notif: Notification) {
    if (notif.path_link === '/login'||notif.path_link === '/logout') {
      Ws.io.emit('auth:user', { user: User.find(notif.from), state: notif.path_link==='/login'?'islogin':'isLogout' })
    }
    if (notif.path_link === '/keluhan-ga') {
      Ws.io.emit('auth:keluhan-ga', {data:notif.note_action, notif_to_role_id:notif.to})
    }
  }
}
