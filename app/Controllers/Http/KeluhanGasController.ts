import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import FormKeluhanGa from 'App/Models/FormKeluhanGa'
import FormKeluhanGaValidator from 'App/Validators/FormKeluhanGaValidator'
import { Response } from '@adonisjs/core/build/standalone'

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
                ])
                    .preload('user')
                    .preload('role')
                    .preload('dept')
                    .paginate(page, limit)
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
                    this.upload_file(img).then(async (res) => {
                        const validate = await request.validate(FormKeluhanGaValidator)
                        const x = new FormKeluhanGa()
                        x.user_id = validate.user_id
                        x.role_id = validate.role_id
                        x.dept_id = validate.dept_id
                        x.notes = validate.notes
                        x.image = res
                        x.status = validate.status
                        x.agree = validate.agree
                        await x.save()
                    })
                } else {
                    const validate = await request.validate(FormKeluhanGaValidator)
                    const x = new FormKeluhanGa()
                    x.user_id = validate.user_id
                    x.role_id = validate.role_id
                    x.dept_id = validate.dept_id
                    x.notes = validate.notes
                    x.status = validate.status
                    x.agree = validate.agree
                    await x.save()
                }
                return response.ok('success store')
            }
        } catch (error) {
            return response.status(error.status).send(error.messages)
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
                const img = request.file('image')
                if (img) {
                    this.upload_file(img).then(async (res) => {
                        const validate = await request.validate(FormKeluhanGaValidator)
                        const x = await FormKeluhanGa.findOrFail(request.param('id'))
                        x.user_id = validate.user_id
                        x.role_id = validate.role_id
                        x.dept_id = validate.dept_id
                        x.notes = validate.notes
                        x.image = res
                        x.status = validate.status
                        x.agree = validate.agree
                        await x.save()
                    })
                } else {
                    const validate = await request.validate(FormKeluhanGaValidator)
                    const x = await FormKeluhanGa.findOrFail(request.param('id'))
                    x.user_id = validate.user_id
                    x.role_id = validate.role_id
                    x.dept_id = validate.dept_id
                    x.notes = validate.notes
                    x.status = validate.status
                    x.agree = validate.agree
                    await x.save()
                }
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

    public async upload_file(img) {
        let date = new Date()
        let dateStr = date.toLocaleDateString("en-GB", { day: "2-digit", month: "2-digit", year: "2-digit" })
        let arr = dateStr.split("/")
        let d = arr[0];
        let m = arr[1];
        let y = arr[2];

        let timeStr = date.toLocaleTimeString("en-GB", { hour12: false, hour: "2-digit", minute: "2-digit", second: "2-digit" }) //
        let arr2 = timeStr.split(":")
        let H = arr2[0];
        let i = arr2[1];
        let s = arr2[2];

        let ymdHms = y + m + d + H + i + s;
        await img.move(Application.tmpPath('uploads/foto-keluhan-ga'), {
            name: `foto_keluhan_${ymdHms}.jpg`,
            overwrite: true,
        })
        return img.fileName
    }
}
