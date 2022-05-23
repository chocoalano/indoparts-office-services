import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Notification from 'App/Models/Notification'

export default class NotificationsController {
    /*
       |--------------------------------------------------------------------------
       | INDEX::FUNCTION
       |--------------------------------------------------------------------------
       */
    public async index({ response, request, auth }: HttpContextContract) {
        try {
            const page = request.input('page', 1)
            const limit = request.input('limit', 1)
            return await Notification.query().where('to',auth.user?.role_id).orderBy('created_at', 'desc').paginate(page, limit)
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }
    /*
       |--------------------------------------------------------------------------
       | COUNT DATA::FUNCTION
       |--------------------------------------------------------------------------
       */
    public async count({ response, request }: HttpContextContract) {
        try {
            const page = request.input('page', 1)
            const limit = request.input('limit', 1)
            const dataNotif = await Notification.query()
                .where('read', 'false').paginate(page, limit)
            const countNotif = await Notification.query().where('read', 'false')
            return response.status(200).send({ count: countNotif.length, data: dataNotif })
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }
}
