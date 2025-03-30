
import { sign, SignOptions, verify, VerifyOptions, Algorithm } from 'jsonwebtoken'
import {UserProfile} from '../interface'
import {envConfig} from '../config'
import {isNil, unauthorized} from '../utils'
import {v4 as uuidv4} from 'uuid'
export class JWTService {
     private static instance: JWTService
     public verifyToken (token: string): UserProfile {
       try {
         const audience = envConfig?.JWT_AUDIENCE.split(/\s|,/)
         const options: VerifyOptions = { issuer: envConfig.JWT_ISSUER, algorithms: [envConfig.JWT_ALGO as unknown as Algorithm ], audience }
         const { payload } = verify(token, envConfig.NETWORK_WEBHOOK_SECRET, options) as {payload: UserProfile}
         return payload
       } catch (error) {
         throw unauthorized('invalid login credentials')
       }
     }

     public generateToken (userProfile: UserProfile, expiresIn?: number): string {
       const payload = userProfile
       const audience = envConfig?.JWT_AUDIENCE.split(/\s|,/)
       const signingOptions: SignOptions = {
         audience,
         expiresIn: expiresIn ?? envConfig.JWT_EXPIRES_IN,
         issuer: envConfig.JWT_ISSUER,
         algorithm: envConfig.JWT_ALGO,
         subject: userProfile.userId.toString() ?? userProfile.email,
         jwtid: uuidv4()
       }
       const token = sign({ payload }, envConfig.NETWORK_WEBHOOK_SECRET, signingOptions)
       return token
     }

     public static get Instance () {
            if (isNil(this.instance))
              this.instance = new this()
     
            return this.instance
          }
}
