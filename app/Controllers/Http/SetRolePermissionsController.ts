import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Permission from 'App/Models/Permission'
import Role from 'App/Models/Role'
import RoleHasPermission from 'App/Models/RoleHasPermission'

export default class SetRolePermissionsController {
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-permission")
            if (await bouncer.allows('read-permission')) {
                const page = request.input('page', 1)
                const limit = request.input('limit', 1)
                const sortDesc = request.input('sortDesc', false)
                return await RoleHasPermission.query().preload('roles').preload('permission').orderBy([
                    {
                        column: 'id',
                        order: sortDesc ? 'desc' : 'asc',
                    }
                ]).paginate(page, limit)
            }
        } catch (error) {
            response.status(error.status).send(error.messages)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            /*
            |--------------------------------------------------------------------------
            | EXAMPLE REQUEST FORM
            |--------------------------------------------------------------------------
            { role_id: 6, permission_id: [ 16, 15, 14, 13 ] }
            |
            */
            await bouncer.authorize("create-permission")
            if (await bouncer.allows('create-permission')) {
                const arrname = [] as any;
                const fetch = request.input('permission_id')
                for (let i = 0; i < fetch.length; i++) {
                    arrname.push({
                        role_id: request.input('role_id'),
                        permission_id: fetch[i]
                    })
                }
                await RoleHasPermission.updateOrCreateMany(['role_id','permission_id'],arrname)
                return response.ok('success')
            }
        } catch (error) {
            response.status(error.status).send(error.messages)
        }
    }

    public async attr_form({ bouncer, response }: HttpContextContract) {
        try {
            await bouncer.authorize("read-permission")
            if (await bouncer.allows('read-permission')) {
                const jabatan = await Role.all()
                const akses = await Permission.all()
                return response.ok({ "jabatan": jabatan, "akses": akses })
            }
        } catch (error) {
            response.status(error.status).send(error.messages)
        }
    }

    public async show({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-permission")
            if (await bouncer.allows('read-permission')) {
                const id = request.param('id')
                const fetch = await RoleHasPermission.query()
                .where('role_id', id)
                return response.ok(fetch)
            }
        } catch (error) {
            response.status(error.status).send(error.messages)
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            /*
            |--------------------------------------------------------------------------
            | EXAMPLE REQUEST FORM
            |--------------------------------------------------------------------------
            { role_id: 6, permission_id: [ 16, 15, 14, 13 ] }
            |
            */
            await bouncer.authorize("create-permission")
            if (await bouncer.allows('create-permission')) {
                const arrname = [] as any;
                const fetch = request.input('permission_id')
                for (let i = 0; i < fetch.length; i++) {
                    arrname.push({
                        role_id: request.input('role_id'),
                        permission_id: fetch[i]
                    })
                }
                await RoleHasPermission.updateOrCreateMany(['role_id','permission_id'],arrname)
                return response.ok('success')
            }
        } catch (error) {
            response.status(error.status).send(error.messages)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("delete-permission")
            if (await bouncer.allows('delete-permission')) {
                const q = await RoleHasPermission.find(request.param('id'))
                if (q) {
                    await q.delete()
                }
                return response.ok('success permission destroy')
            }
        } catch (error) {
            response.status(error.status).send(error.messages)
        }
    }
}
