import { ApplicationContract } from '@ioc:Adonis/Core/Application'

export default class AppProvider {
  constructor (protected app: ApplicationContract) {
  }

  public register () {
    // Register your own bindings
  }

  public async boot () {
    // IoC container is ready
  }

  public async ready () {
    if (this.app.environment === 'web') {
      console.log('is connected');
      
      await import('../start/socket')
    }

  }

  public async shutdown () {
    // Cleanup, since app is going down
  }
}
