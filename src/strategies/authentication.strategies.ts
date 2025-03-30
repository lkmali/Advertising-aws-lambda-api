import { Request } from 'express'
import {UserProfile} from '../interface';

export abstract class AuthenticationStrategy {
    abstract authenticate (request: Request): Promise<UserProfile>
}
