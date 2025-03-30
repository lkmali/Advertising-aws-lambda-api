
import { Algorithm } from 'jsonwebtoken'
import {Collection} from 'mongoose';
import {ObjectId} from 'mongodb'
import {Request, Response} from 'express'


export type AuthenticationStrategyType = 'jwtAuth' | 'basicAuth'
export interface Env {
    JWT_STRATEGY_NAME:'jwtAuth',
    BASIC_STRATEGY_NAME:'basicAuth',
    MONGO_DB_URL: string;
    JWT_AUDIENCE: string, 
    JWT_ISSUER: string
    JWT_ALGO: Algorithm
    JWT_EXPIRES_IN: number
    NETWORK_WEBHOOK_SECRET: string
    IS_LOCAL_APP: boolean
    PASSWORD_ROUNDS:number
}

export  interface UserProfile {
    userId: string;
    username: string;
    email: string;
    companyName: string;
}

export interface SignUpNewUser {
    email: string;
    companyName: string;
    phone: string;
    password: string;
}

export interface IUsers {
    _id: ObjectId;
    email:string
    username:string
    phone:string
    isActive:boolean
    isVerified:boolean
    companyName:string
} 

export interface Password {
    userId: ObjectId;
    password: string
} 


export interface MongoCollection {
    Users: Collection<IUsers>
    Password: Collection<Password>
  }

  export interface ResponseData {
    auth?: AuthenticationStrategyType
    code?: number
    async?: boolean
    topic?: string
  }

export type UserPassword = IUsers & {password: string}

export interface UserCredentials { email: string; password: string }

export interface ControllersRequest {
    request: Request
    response: Response
    userProfile: UserProfile
  }