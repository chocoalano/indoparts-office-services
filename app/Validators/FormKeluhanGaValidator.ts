import { schema } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class FormKeluhanGaValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    user_id: schema.number(),
    role_id: schema.number(),
    dept_id: schema.number(),
    notes: schema.string(),
    status: schema.enum(['true', 'false']),
    agree: schema.enum(['true', 'false']),
  })
}
