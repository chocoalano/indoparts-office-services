import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ApprovalKeluhanGa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public form_keluhan_ga_id: number
  @column()
  public user_id: number
  @column()
  public signature: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
