import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class ProsesKeluhanGa extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public form_keluhan_ga_id: number
  @column()
  public kategori: string
  @column()
  public status_pengadaan_barang: string
  @column()
  public status_penyelesaian: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
