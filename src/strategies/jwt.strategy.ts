import { Request } from 'express'
import { unauthorized } from '../utils'
import { AuthenticationStrategy } from './authentication.strategies'
import {JWTService} from '../service/jwt.service'
import {UserProfile} from '../interface'

export class JWTAuthenticationStrategy implements AuthenticationStrategy {
  private readonly jwtService: JWTService

  constructor() {
    this.jwtService = new JWTService()
  }

  async authenticate(request: Request): Promise<UserProfile> {
    const token: string = this.extractCredentials(request)
    const userProfile: UserProfile = this.jwtService.verifyToken(token) as UserProfile
    return Promise.resolve(userProfile)
  }

  extractCredentials(request: Request): string {
    switch (true) {
      case request.headers.authorization === undefined:
        throw unauthorized('Authorization header not found.')
      default:
        return String(request.headers.authorization).trim().split(' ')[1]
    }
  }
}
