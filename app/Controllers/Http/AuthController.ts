import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import Application from '@ioc:Adonis/Core/Application'
import Database from '@ioc:Adonis/Lucid/Database';
import Dept from 'App/Models/Dept';
import Role from 'App/Models/Role';
import User from 'App/Models/User';
import LoginValidator from 'App/Validators/LoginValidator';
import RegisterValidator from 'App/Validators/RegisterValidator';
import UserValidator from 'App/Validators/UserValidator';

export default class AuthController {
    /*
    |--------------------------------------------------------------------------
    | REGISTER::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async register({ request, auth, response }: HttpContextContract) {
        try {
            /*
            |--------------------------------------------------------------------------
            | EXAMPLE REQUEST FORM
            |--------------------------------------------------------------------------
                {
                    "role_id": 2,
                    "dept_id": 2,
                    "name": "test",
                    "nik": "002",
                    "password": "password"
                }
            |
            */
            const payload = await request.validate(RegisterValidator)
            const newUser = new User();
            newUser.role_id = payload.role_id;
            newUser.dept_id = payload.dept_id;
            newUser.name = payload.name;
            newUser.nik = payload.nik;
            newUser.password = payload.password;
            newUser.activation = 'false';
            newUser.avatar = 'testing.png';
            await newUser.save()
            const token = await auth.use("api").login(newUser, {
                expiresIn: "1 days",
            });
            return response.send(token.toJSON())
        } catch (error) {
            return response.badRequest(error.messages)
        }
    }
    /*
    |--------------------------------------------------------------------------
    | LOGIN::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async login({ request, auth, response }: HttpContextContract) {
        try {
            /*
            |--------------------------------------------------------------------------
            | EXAMPLE REQUEST FORM
            |--------------------------------------------------------------------------
                { nik: '001', password: '123456' }
            |
            */
            const payload = await request.validate(LoginValidator)
            const token = await auth.use("api").attempt(payload.nik,payload.password, {
                expiresIn: "1 days",
            });
            return response.status(200).send(token.toJSON())
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }
    /*
    |--------------------------------------------------------------------------
    | PROFILE::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async profile({ auth, response }: HttpContextContract) {
        try {
            const arr: string[] = [];
            const call = Database
                .from('role_has_permissions AS rhp')
                .join('permissions AS p', 'p.id', '=', 'rhp.permission_id')
                .join('roles AS r', 'rhp.role_id', '=', 'r.id')
                .join('users AS u', 'u.role_id', '=', 'r.id')
                .where('u.id', auth.user?.id)
                .select('p.name AS permissionsname');
            (await call).forEach(el => {
                arr.push(el.permissionsname)
            });
            const rolename = await Role.find(auth.user?.role_id)
            const deptname = await Dept.find(auth.user?.dept_id)
            const q = {
                "id": auth.user?.id,
                "role_id": auth.user?.role_id,
                "dept_id": auth.user?.dept_id,
                "role_name": rolename?.rolename,
                "dept_name": deptname?.deptname,
                "name": auth.user?.name,
                "nik": auth.user?.nik,
                "activation": auth.user?.activation,
                "avatar": auth.user?.avatar,
            };
            return response.ok({ user: q, permission: arr });
        } catch (error) {
            response.send(error.message)
        }
    }
    /*
    |--------------------------------------------------------------------------
    | PROFILE UPDATE::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async profileUpdate({ response, request, auth }: HttpContextContract) {
        try {
            /*
            |--------------------------------------------------------------------------
            | EXAMPLE REQUEST FORM
            |--------------------------------------------------------------------------
                {
                    "role_id": 1,
                    "dept_id": 1,
                    "name": "test",
                    "nik": "002",
                    "password": "password",
                    "activation": "true",
                    "avatar": "testing.jpg"
                }
            |
            */
            const payload = await request.validate(UserValidator)
            await payload.avatar.move(Application.tmpPath('uploads/avatar-users'))
            const user = await User.findOrFail(auth.user?.id)
            user.role_id=payload.role_id
            user.dept_id=payload.dept_id
            user.name=payload.name
            user.nik=payload.nik
            user.password=payload.password
            user.activation=payload.activation
            user.avatar=payload.avatar.fileName as string
            await user.save()
            return response.status(200).send("success")
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }
    /*
    |--------------------------------------------------------------------------
    | LOGOUT::FUNCTION
    |--------------------------------------------------------------------------
    */
    public async logout({ auth, response }: HttpContextContract) {
        try {
            if (await auth.check()) {
                auth.use("api").logout()
            }
            const msg = (await auth.check()) ? 'Success logout' : 'Invalid Credential'
            const status = (await auth.check()) ? 200 : 401
            return response.status(status).send(msg)
        } catch (error) {
            return response.status(error.status).send(error.messages)
        }
    }
}
