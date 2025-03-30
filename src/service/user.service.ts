import {PasswordRepository, UserRepository} from "../database/repository"
import {IUsers, SignUpNewUser, UserCredentials, UserProfile} from "../interface"
import {isNil, omit, unauthorized} from "../utils"
import {ObjectId} from 'mongodb'
import {PasswordService} from "./password.service"
export class UserService {
   private static instance: UserService
   private readonly userRepository: UserRepository
   private readonly passwordService: PasswordService
   private readonly passwordRepository: PasswordRepository
     constructor () {
       this.userRepository = new UserRepository()
       this.passwordService = new PasswordService()
       this.passwordRepository = new PasswordRepository()
     }

     async signUpNewUser (signUpNewUser: SignUpNewUser): Promise<IUsers> {
       const user = await this.userRepository.getUser({email:signUpNewUser.email})
       if (!isNil(user))
         throw unauthorized('your account is already create with origination please try to login')


       const userId = new ObjectId()
       const result = await this.userRepository.saveUser({
           _id: userId,
           ...omit(signUpNewUser, ['password']),
           username: `admin_${signUpNewUser.companyName}`,
           isActive: true,
           isVerified: false
       })
       await this.passwordRepository.upsertPassword(userId, signUpNewUser.password)
       return result
     }


     async verifyCredentials (credentials: UserCredentials): Promise<UserProfile> {
       let passwordMatched = false
       const invalidCredentialsError = 'authentication unsuccessful.'
       const email = credentials.email
       const user = await this.userRepository.getUserWithPassword({email})
       if (isNil(user)) throw unauthorized(invalidCredentialsError)
       if (user === null) throw unauthorized(invalidCredentialsError)
       passwordMatched = await this.passwordService.comparePassword(credentials.password, user.password)
       if (!passwordMatched) throw unauthorized(invalidCredentialsError)
        return { ...omit(user, ['password']), userId: user._id.toString() }
     }

     async getUser(userId:string): Promise<IUsers | null> {
        return await this.userRepository.getUser({ _id: new ObjectId(userId) })
      }

     public static get Instance () {
       if (isNil(this.instance))
         this.instance = new this()

       return this.instance
     }
}
