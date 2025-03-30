import { model, Schema } from 'mongoose'
import {IUsers} from '../../interface'

const userSchema = new Schema<IUsers>({
  email: { type: String, unique: true, required: true },
  username: { type: String, required: true},
  companyName: { type: String, required: true},
  phone: { type: String, required: true},
  isActive: { type: Boolean,  default: true },
  isVerified: { type: Boolean,  default: false }
}, { collection: 'Users', versionKey: false, timestamps: true })

// Perform any necessary operations before saving the u    
export const Users = model('Users', userSchema)
