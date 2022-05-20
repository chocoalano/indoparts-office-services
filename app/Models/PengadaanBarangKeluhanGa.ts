import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class PengadaanBarangKeluhanGa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public form_keluhan_ga_id: number
  @column()
  public jenis_form: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
