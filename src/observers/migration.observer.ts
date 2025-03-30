import { registry } from 'dependencyjs'
import { envConfig } from '../config'
import { MongoDBConnection } from '../database/connection';
import { AuthenticationStrategy, JWTAuthenticationStrategy,BasicAuthenticationStrategy } from '../strategies'

export class MigrationObserver {
    private static instance: MigrationObserver

  async start(): Promise<void> {
    this.registerAuthenticationStrategy()
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    await this.migrateSchema()

  }

  async migrateSchema(): Promise<void> {
    console.log('Migration start.')
    await MongoDBConnection.getInstance()
    console.log('Migration complete.')
  }
  registerAuthenticationStrategy() {
    registry.register(AuthenticationStrategy, new JWTAuthenticationStrategy(), envConfig.JWT_STRATEGY_NAME)
    registry.register(AuthenticationStrategy, new BasicAuthenticationStrategy(), envConfig.BASIC_STRATEGY_NAME)
  }

    static getInstance(): MigrationObserver {
        if (!MigrationObserver.instance) {
        MigrationObserver.instance = new MigrationObserver()
        }
        return MigrationObserver.instance
    }
}
