import { DateTime } from 'luxon'
import { BaseModel, column } from '@ioc:Adonis/Lucid/Orm'

export default class FormPpItem extends BaseModel {
  @column({ isPrimary: true })
  public id: number

  @column()
  public form_pp_id: number
  @column()
  public nama: string
  @column()
  public spesifikasi: string
  @column()
  public supplier: string
  @column()
  public satuan: string
  @column()
  public qty: number
  @column()
  public keterangan: string
  @column()
  public realisasi: string

  @column.dateTime({ autoCreate: true })
  public createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  public updatedAt: DateTime
}
