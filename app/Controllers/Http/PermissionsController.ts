import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'

import Permission from "App/Models/Permission"
import PermissionValidator from "App/Validators/PermissionValidator"

export default class PermissionsController {
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-permission")
            if (await bouncer.allows('read-permission')) {
                const page = request.input('page', 1)
                const limit = request.input('limit', 1)
                const data = await Permission.query().paginate(page, limit)
                return response.ok(data)
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
            {
                "name": "Cuti",
                "permission": ["create","read","update","delete","export","import"]
            }
            |
            */
            await bouncer.authorize("create-permission")
            if (await bouncer.allows('create-permission')) {
                if (request.input('permission')) {
                    await request.validate(PermissionValidator)
                    const arrname = [] as any;
                    const fetch = request.input('permission')
                    for (let i = 0; i < fetch.length; i++) {
                        const txt = fetch[i] + '-' + request.input('name')
                        arrname.push({
                            name: txt.toLowerCase(),
                            basepermission: request.input('name').toLowerCase()
                        })
                    }
                    await Permission.createMany(arrname)
                    return response.ok('success permission store')
                }
                return response.status(422).send('permission is required')
            }
        } catch (error) {
            response.status(error.status).send(error.messages)
        }
    }

    public async show({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-permission")
            if (await bouncer.allows('read-permission')) {
                return response.ok(await Permission.find(request.param('id')))
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
            {
                "name": "Cuti",
                "permission": ["create","read","update","delete","export","import"]
            }
            |
            */
            await bouncer.authorize("update-permission")
            if (await bouncer.allows('update-permission')) {
                const q = await Permission.find(request.param('id'))
                if (q) {
                    const validate = await request.validate(PermissionValidator)
                    q.merge(validate)
                    await q.save()
                }
                return response.ok('success permission update')
            }
        } catch (error) {
            response.status(error.status).send(error.messages)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("delete-permission")
            if (await bouncer.allows('delete-permission')) {
                const q = await Permission.find(request.param('id'))
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
