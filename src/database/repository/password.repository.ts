
import {ObjectId} from 'mongodb'
import {MongoDBConnection} from "../connection"
import {PasswordService} from '../../service/password.service'
export class PasswordRepository {
     private readonly passwordService: PasswordService
     constructor () {
       this.passwordService = new PasswordService()
     }

     async upsertPassword (userId: ObjectId, password: string): Promise<void> {
       const dbInstance = await MongoDBConnection.getInstance()
       const hashedPassword = await this.passwordService.hashPassword(password)
       await dbInstance.Password.updateOne({ userId }, { $set: { password: hashedPassword, userId } }, { upsert: true })
     }
}
