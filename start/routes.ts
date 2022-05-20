/*
|--------------------------------------------------------------------------
| Routes
|--------------------------------------------------------------------------
|
| This file is dedicated for defining HTTP routes. A single file is enough
| for majority of projects, however you can define routes in different
| files and just make sure to import them inside this file. For example
|
| Define routes in following two files
| ├── start/routes/cart.ts
| ├── start/routes/customer.ts
|
| and then import them inside `start/routes.ts` as follows
|
| import './routes/cart'
| import './routes/customer'
|
*/

import Route from '@ioc:Adonis/Core/Route'
import Application from '@ioc:Adonis/Core/Application'

Route.group(() => {
  Route.get('images/:folder/:filename', async ({ params, response }) => {
    const filePath = Application.tmpPath(`uploads/${params.folder}/${params.filename}`)
    return response.attachment(filePath)
  })
  Route.post("register", "AuthController.register");
  Route.post("login", "AuthController.login");
  Route.get("data-auth-form", "AuthController.getAuthForm");
  Route.group(() => {
    Route.get("profile", "AuthController.profile");
    Route.get("list-user-login", "AuthController.list_login");
    Route.post("profile-update", "AuthController.profileUpdate");
    Route.post("logout", "AuthController.logout");
    Route.resource("users", "UsersController",).apiOnly();
    Route.resource("role", "RolesController",).apiOnly();
    Route.resource("permission", "PermissionsController",).apiOnly();
    Route.resource("dept", "DeptsController",).apiOnly();
    Route.resource("role-permission", "SetRolePermissionsController",).apiOnly();
    Route.resource("keluhan-ga", "KeluhanGasController",).apiOnly();
    Route.get("role-permission-attr-form", "SetRolePermissionsController.attr_form");
  }).middleware("auth:api");
}).prefix("api");
