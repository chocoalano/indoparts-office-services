/**
 * Contract source: https://git.io/Jte3T
 *
 * Feel free to let us know via PR, if you find something broken in this config
 * file.
 */

import Bouncer from '@ioc:Adonis/Addons/Bouncer'
import Database from '@ioc:Adonis/Lucid/Database';
import User from 'App/Models/User';

/*
|--------------------------------------------------------------------------
| Bouncer Actions
|--------------------------------------------------------------------------
|
| Actions allows you to separate your application business logic from the
| authorization logic. Feel free to make use of policies when you find
| yourself creating too many actions
|
| You can define an action using the `.define` method on the Bouncer object
| as shown in the following example
|
| ```
| 	Bouncer.define('deletePost', (user: User, post: Post) => {
|			return post.user_id === user.id
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "actions" const from this file
|****************************************************************
*/
async function permissionGuard(params:number, name:string) {
    
    const arr : number[] = [];
    const call = Database
    .from('permissions')
    .join('role_has_permissions', 'permissions.id', '=', 'role_has_permissions.permission_id')
    .join('roles', 'role_has_permissions.role_id', '=', 'roles.id')
    .where('permissions.name', name)
    .select('role_has_permissions.role_id');
    (await call).forEach(el => {
        arr.push(el.role_id)
    });
    return arr.includes(params)
}
export const { actions } = Bouncer
// USER AUTHORIZATION
.define('create-user', (user: User) => {
    return permissionGuard(user.role_id, 'create-user')
})
.define('read-user', (user: User) => {
    return permissionGuard(user.role_id, 'read-user')
})
.define('update-user', (user: User) => {
    return permissionGuard(user.role_id, 'update-user')
})
.define('delete-user', (user: User) => {
    return permissionGuard(user.role_id, 'delete-user')
})
// ROLES AUTHORIZATION
.define('create-role', (user: User) => {
    return permissionGuard(user.role_id, 'create-role')
})
.define('read-role', (user: User) => {
    return permissionGuard(user.role_id, 'read-role')
})
.define('update-role', (user: User) => {
    return permissionGuard(user.role_id, 'update-role')
})
.define('delete-role', (user: User) => {
    return permissionGuard(user.role_id, 'delete-role')
})
// PERMISSION AUTHORIZATION
.define('create-permission', (user: User) => {
    return permissionGuard(user.role_id, 'create-permission')
})
.define('read-permission', (user: User) => {
    return permissionGuard(user.role_id, 'read-permission')
})
.define('update-permission', (user: User) => {
    return permissionGuard(user.role_id, 'update-permission')
})
.define('delete-permission', (user: User) => {
    return permissionGuard(user.role_id, 'delete-permission')
})
// DEPT AUTHORIZATION
.define('create-dept', (user: User) => {
    return permissionGuard(user.role_id, 'create-dept')
})
.define('read-dept', (user: User) => {
    return permissionGuard(user.role_id, 'read-dept')
})
.define('update-dept', (user: User) => {
    return permissionGuard(user.role_id, 'update-dept')
})
.define('delete-dept', (user: User) => {
    return permissionGuard(user.role_id, 'delete-dept')
})
/*
|--------------------------------------------------------------------------
| Bouncer Policies
|--------------------------------------------------------------------------
|
| Policies are self contained actions for a given resource. For example: You
| can create a policy for a "User" resource, one policy for a "Post" resource
| and so on.
|
| The "registerPolicies" accepts a unique policy name and a function to lazy
| import the policy
|
| ```
| 	Bouncer.registerPolicies({
|			UserPolicy: () => import('App/Policies/User'),
| 		PostPolicy: () => import('App/Policies/Post')
| 	})
| ```
|
|****************************************************************
| NOTE: Always export the "policies" const from this file
|****************************************************************
*/
export const { policies } = Bouncer.registerPolicies({})
