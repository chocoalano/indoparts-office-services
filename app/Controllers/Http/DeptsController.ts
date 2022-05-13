import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Dept from 'App/Models/Dept'
import DeptValidator from 'App/Validators/DeptValidator'

export default class DeptsController {
    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-dept")
            if (await bouncer.allows('read-dept')) {
                const page = request.input('page', 1)
                const limit = request.input('limit', 1)
                return await Dept.query().paginate(page, limit)
            }
        } catch (error) {
            return response.forbidden(error.messages)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            /*
            |--------------------------------------------------------------------------
            | EXAMPLE REQUEST FORM
            |--------------------------------------------------------------------------
            |{
            |  deptname: string,
            |}
            |
            */
            await bouncer.authorize("create-dept")
            if (await bouncer.allows('create-dept')) {
                const payload = await request.validate(DeptValidator)
                console.log(payload);
                const q = new Dept()
                q.deptname=payload.deptname
                await q.save()
                return response.status(200).send("success")
            }
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("read-dept")
            if (await bouncer.allows('read-dept')) {
                const post = await Dept.find(request.param('id'));
                return response.status(200).send(post)
            }
        } catch (error) {
            return error
        }
    }

    public async update({ bouncer, request, response }: HttpContextContract) {
        try {
            /*
            |--------------------------------------------------------------------------
            | EXAMPLE REQUEST FORM
            |--------------------------------------------------------------------------
            |{
            |  deptname: string,
            |}
            |
            */
            await bouncer.authorize("update-dept")
            if (await bouncer.allows('update-dept')) {
                const payload = await request.validate(DeptValidator)
                const q = await Dept.findOrFail(request.param('id'))
                q.deptname=payload.deptname
                await q.save()
                return response.status(200).send("success")
            }
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("delete-dept")
            if (await bouncer.allows('delete-dept')) {
                const q = await Dept.findOrFail(request.param('id'))
                await q.delete()
                return response.status(200).send("success")
            }
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }
}
