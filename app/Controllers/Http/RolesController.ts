import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Role from 'App/Models/Role'
import RoleValidator from 'App/Validators/RoleValidator'

export default class RolesController {
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-role")
            if (await bouncer.allows('read-role')) {
                const page = request.input('page', 1)
                const limit = request.input('limit', 1)
                const sortDesc = request.input('sortDesc', false)
                const search = request.input('search')
                return await Role.query().where('rolename', 'LIKE', '%'+search+'%').orderBy([
                    {
                        column: 'id',
                        order: sortDesc ? 'desc' : 'asc',
                    }
                ]).paginate(page, limit)
            }
        } catch (error) {
            return response.badRequest(error.messages)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("create-role")
            if (await bouncer.allows('create-role')) {
                const validate = await request.validate(RoleValidator)
                const role = new Role()
                role.merge(validate)
                return await role.save()
            }
        } catch (error) {
            return response.unprocessableEntity(error.messages)
        }
    }

    public async show({ bouncer, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-role")
            if (await bouncer.allows('read-role')) {
                return await Role.find(request.param('id'));
            }
        } catch (error) {
            return error
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("update-role")
            if (await bouncer.allows('update-role')) {
                const payload = await request.validate(RoleValidator)
                const role = await Role.findOrFail(request.param('id'))
                role.merge(payload)
                return await role.save()
            }
        } catch (error) {
            return response.unprocessableEntity(error.messages)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("delete-role")
            if (await bouncer.allows('delete-role')) {
                const role = await Role.findOrFail(request.param('id'))
                return await role.delete()
            }
        } catch (error) {
            return response.badRequest(error.messages)
        }
    }
}
