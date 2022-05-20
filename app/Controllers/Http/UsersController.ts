import Application from '@ioc:Adonis/Core/Application'
import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from 'App/Models/User'
import UserValidator from 'App/Validators/UserValidator'
import Drive from '@ioc:Adonis/Core/Drive'
export default class UsersController {

    public async index({ bouncer, response, request }: HttpContextContract) {
        try {
            await bouncer.authorize("read-user")
            if (await bouncer.allows('read-user')) {
                const page = request.input('page', 1)
                const limit = request.input('limit', 1)
                const sortDesc = request.input('sortDesc', false)
                const search = request.input('search')
                return await User.query().where('name', 'LIKE', '%'+search+'%').orderBy([
                    {
                        column: 'nik',
                        order: sortDesc ? 'desc' : 'asc',
                    }
                ]).preload('roles').preload('dept').paginate(page, limit)
            }
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }

    public async store({ bouncer, request, response }: HttpContextContract) {
        try {
            /*
            |--------------------------------------------------------------------------
            | EXAMPLE REQUEST FORM
            |--------------------------------------------------------------------------
            |{
            |  role_id: 2,
            |  dept_id: 2,
            |  name: 'test',
            |  nik: '002',
            |  password: 'password',
            |  activation: 'true',
            |  avatar: 'test.jpg'
            |}
            |
            */
            await bouncer.authorize("create-user")
            if (await bouncer.allows('create-user')) {
                const payload = await request.validate(UserValidator)
                await payload.avatar.move(Application.tmpPath('uploads/avatar-users'), {
                    name: `${payload.nik}.jpg`,
                    overwrite: true,
                })

                const user = new User()
                user.role_id = payload.role_id
                user.dept_id = payload.dept_id
                user.name = payload.name
                user.nik = payload.nik
                user.password = payload.password
                user.activation = payload.activation
                user.avatar = payload.avatar.fileName as string
                await user.save()
                return response.status(200).send('success')
            }
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }

    public async show({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("read-user")
            if (await bouncer.allows('read-user')) {
                const post = await User.find(request.param('id'));
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
            |  role_id: 2,
            |  dept_id: 2,
            |  name: 'test',
            |  nik: '002',
            |  password: 'password',
            |  activation: 'true',
            |  avatar: 'test.jpg'
            |}
            |
            */
            await bouncer.authorize("update-user")
            if (await bouncer.allows('update-user')) {
                const payload = await request.validate(UserValidator)
                const user = await User.findOrFail(request.param('id'))
                const filePath = Application.tmpPath(`uploads/avatar-users/${user.avatar}`)
                await Drive.delete(filePath)
                await payload.avatar.move(Application.tmpPath('uploads/avatar-users'), {
                    name: `${payload.nik}.jpg`,
                    overwrite: true,
                })
                user.role_id = payload.role_id
                user.dept_id = payload.dept_id
                user.name = payload.name
                user.nik = payload.nik
                user.password = payload.password
                user.activation = payload.activation
                user.avatar = payload.avatar.fileName as string
                await user.save()
                return response.status(200).send("success")
            }
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }

    public async destroy({ bouncer, request, response }: HttpContextContract) {
        try {
            await bouncer.authorize("delete-user")
            if (await bouncer.allows('delete-user')) {
                const user = await User.findOrFail(request.param('id'))
                const filePath = Application.tmpPath(`uploads/avatar-users/${user.avatar}`)
                await Drive.delete(filePath)
                await user.delete()
                return response.status(200).send('success')
            }
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }
}
