declare module '@ioc:Adonis/Addons/Auth' {
  interface ProvidersList {
    user: {
      implementation: DatabaseProviderContract<DatabaseProviderRow>
      config: DatabaseProviderConfig
    },
  }
  interface GuardsList {
    api: {
      implementation: OATGuardContract<'user', 'api'>
      config: OATGuardConfig<'user'>
    },
  }
}
