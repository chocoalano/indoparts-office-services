import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FormSppDiketahui extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public form_spp_id: number
  @column()
  public user_id: number
  @column()
  public name: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
