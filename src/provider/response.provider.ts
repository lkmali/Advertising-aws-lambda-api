import { registry } from 'dependencyjs'
import { Request, Response } from 'express'
import { AuthenticationStrategy } from '../strategies'
import {isNil} from '../utils'
import {AuthenticationStrategyType, ResponseData, UserProfile} from '../interface'
const authenticate = async (request: Request, auth: AuthenticationStrategyType): Promise<UserProfile> => {
  const authService: AuthenticationStrategy = registry.resolve(AuthenticationStrategy, auth)
  return authService.authenticate(request)
}
export const send = (next: Function, data: ResponseData) => async (request: Request, response: Response) => {
  try {
    let userProfile = {}
    const { auth = null, async = true } = data
    if (!isNil(auth) && auth !== null)
      userProfile = await authenticate(request, auth)

    const result = async ? await next({ request, response, userProfile }) : next({ request, response, userProfile })
    response.status(200).json(result)
  } catch (error: any) {
    console.trace('Error in send function:', error)

    const statusCode = Object.prototype.hasOwnProperty.call(error, 'statusCode') ? error.statusCode : 500
    const message = Object.prototype.hasOwnProperty.call(error, 'statusCode') ? error.error : { message: 'Internal server error' }
    response.status(statusCode).send(message)
  }
}
