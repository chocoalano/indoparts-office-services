import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FormPp extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pengadaan_barang_keluhan_ga_id: number
  @column()
  public no_pp: string
  @column()
  public tanggal: Date
  @column()
  public dept_id: number
  @column()
  public keperluan: string
  @column()
  public referensi: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
