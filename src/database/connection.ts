import {connect} from "mongoose";
import {envConfig} from "../config";
import {Password, Users} from "./models";
import {MongoCollection} from "../interface";
export class MongoDBConnection {
  private static instance: MongoCollection | null = null;


  getConnection = async () => {
    // eslint-disable-next-line @typescript-eslint/tslint/config
    if (MongoDBConnection.instance === null || MongoDBConnection.instance === undefined)
      MongoDBConnection.instance = await MongoDBConnection.getInstance()

    return MongoDBConnection.instance
  }

  static getInstance = async (): Promise<MongoCollection> => {
    return new Promise<MongoCollection>(async (resolve, reject) => {
          try {
            const connection = await connect(envConfig.MONGO_DB_URL)
            console.log("MongoDB connection Info:", connection.connection);
            connection.connection.on("error", (err: any) => {
              console.error("MongoDB connection error:", err);
              reject(err)
            }
            );

            connection.connection.on("connection", () => {
                console.log("MongoDB connection established 1234");
              }
              );
            connection.connection.on("disconnected", (error) => {    
              console.log("MongoDB connection disconnected", error);
              reject(error)
            }
            );
            connection.connection.on("reconnected", () => {     
              console.log("MongoDB connection reconnected");
            }); 
        
            resolve({
                Users, Password
              } as unknown as MongoCollection)
        } catch (error) {
          console.error("MongoDB connection error:", error);
          reject(error)
        }
      })
  
  }


  public async loadConnection(): Promise<void> {
    await MongoDBConnection.getInstance() 
  }
}