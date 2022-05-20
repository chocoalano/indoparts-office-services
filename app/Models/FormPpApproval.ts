import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FormPpApproval extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public form_pp_id: number
  @column()
  public pemohon_user_id: number
  @column()
  public pemohon_signature: string
  @column()
  public admin_user_id: number
  @column()
  public admin_signature: string
  @column()
  public mengetahui_user_id: number
  @column()
  public mengetahui_signature: string
  @column()
  public disetujui_user_id: number
  @column()
  public disetujui_signature: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
