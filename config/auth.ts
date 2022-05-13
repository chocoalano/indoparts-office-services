

import { AuthConfig } from '@ioc:Adonis/Addons/Auth'
const authConfig: AuthConfig = {
  guard: 'api',
  guards: {
    api: {
      driver: 'oat',
      tokenProvider: {
        type: 'api',
        driver: 'database',
        table: 'api_tokens',
        foreignKey: 'user_id',
      },

      provider: {
        driver: 'database',
        identifierKey: 'id',
        uids: ['nik'],
        usersTable: 'users',
      },
    },
  },
}

export default authConfig
