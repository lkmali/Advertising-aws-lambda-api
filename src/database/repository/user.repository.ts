import {FilterQuery} from "mongoose"
import {IUsers, UserPassword} from "../../interface"
import { Users } from "../models/users"
export class UserRepository {
  async saveUser (data: IUsers): Promise<IUsers> {
        const user = new Users(data)
        const result = await user.save()
        return result
      }
  async getUser (query:FilterQuery<IUsers>): Promise<IUsers | null> {
    const result = await Users.findOne(query)
    return result
  }

  async getUserWithPassword (query:FilterQuery<IUsers>): Promise<UserPassword | null> {
    const result =  await Users.aggregate([{
      $match: query
    },
    {
      $lookup: {
        from: 'Password',
        localField: '_id',
        foreignField: 'userId',
        as: 'password'
      }
    },
    {
      $unwind: {
        path: '$password'
      }
    },
    {
      $project: {
        _id: 1,
        email: 1,
        username: 1,
        companyName: 1,
        phone: 1,
        password: '$password.password'
      }
    }])
    if(result && result.length > 0) {
      return result[0]
    }
    return null
  }
}
