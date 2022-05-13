import { schema, rules } from '@ioc:Adonis/Core/Validator'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Messages from './Mesages'

export default class UserValidator extends Messages{
  constructor(protected ctx: HttpContextContract) {
    super()
  }
  public schema = schema.create({
    role_id: schema.number(),
    dept_id: schema.number(),
    name: schema.string(),
    nik: schema.string(),
    password: schema.string([
      rules.minLength(6),
      rules.confirmed(),
    ]),
    activation: schema.enum(['true', 'false']),
    avatar: schema.file({
      size: '2mb',
      extnames: ['jpg', 'png'],
    }),
  })
}
