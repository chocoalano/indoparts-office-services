import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FormSpp extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public pengadaan_barang_keluhan_ga_id: number
  @column()
  public status: string
  @column()
  public no_spp: string
  @column()
  public company_name: string
  @column()
  public title: string
  @column()
  public user_id: number
  @column()
  public dept_id: number
  @column()
  public prihal: string
  @column()
  public tanggal: Date
  @column()
  public estimasi_biaya: string
  @column()
  public content: string
  @column()
  public tanggal_disahkan: Date
  @column()
  public saran: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
