import {ControllersRequest} from "../interface"
import {JWTService} from "../service/jwt.service"
import {UserService} from "../service/user.service"

export const basicAuth =  function({userProfile }: ControllersRequest){
    return {
        userId: userProfile.userId,
        token: JWTService.Instance.generateToken(userProfile)
      }
}
export const signUp = function ({request }: ControllersRequest){
    return UserService.Instance.signUpNewUser(request.body)
}

export const getUser = async function ({userProfile }: ControllersRequest){
    return UserService.Instance.getUser(userProfile.userId)
}
