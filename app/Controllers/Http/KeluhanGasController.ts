import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import FormKeluhanGa from 'App/Models/FormKeluhanGa'
import FormKeluhanGaValidator from 'App/Validators/FormKeluhanGaValidator'

export default class KeluhanGasController {
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-keluhan-ga")
            if (await bouncer.allows('read-keluhan-ga')) {
                const page = request.input('page', 1)
                const limit = request.input('limit', 1)
                const sortDesc = request.input('sortDesc', false)
                const search = request.input('search')
                return await FormKeluhanGa.query().where('notes', 'LIKE', '%' + search + '%').orderBy([
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
            |
            */
            await bouncer.authorize("create-keluhan-ga")
            if (await bouncer.allows('create-keluhan-ga')) {
                const img = request.file('image')
                if (img) {
                    await img.move(Application.tmpPath('uploads/foto-keluhan-ga'), {
                        name: `foto_keluhan_${(new Date()).toJSON()}.jpg`,
                        overwrite: true,
                    })
                }
                const validate = await request.validate(FormKeluhanGaValidator)
                const x = new FormKeluhanGa()
                x.user_id=validate.user_id
                x.role_id=validate.role_id
                x.dept_id=validate.dept_id
                x.notes=validate.notes
                x.image=validate.image.fileName as string
                x.status=validate.status
                x.agree=validate.agree
                await x.save()
                return response.ok('success store')
            }
        } catch (error) {
            console.log(error);
            
            // response.status(error.status).send(error.messages)
        }
    }

    public async show({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-keluhan-ga")
            if (await bouncer.allows('read-keluhan-ga')) {
                return response.ok(await FormKeluhanGa.find(request.param('id')))
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
            |
            */
            await bouncer.authorize("update-keluhan-ga")
            if (await bouncer.allows('update-keluhan-ga')) {
                const validate = await request.validate(FormKeluhanGaValidator)
                const x = await FormKeluhanGa.findOrFail(request.param('id'))
                x.user_id=validate.user_id
                x.role_id=validate.role_id
                x.dept_id=validate.dept_id
                x.notes=validate.notes
                x.image=validate.image.fileName as string
                x.status=validate.status
                x.agree=validate.agree
                await x.save()
                return response.ok('success update')
            }
        } catch (error) {
            response.status(error.status).send(error.messages)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("delete-keluhan-ga")
            if (await bouncer.allows('delete-keluhan-ga')) {
                const q = await FormKeluhanGa.find(request.param('id'))
                if (q) {
                    await q.delete()
                }
                return response.ok('success destroy')
            }
        } catch (error) {
            response.status(error.status).send(error.messages)
        }
    }
}
