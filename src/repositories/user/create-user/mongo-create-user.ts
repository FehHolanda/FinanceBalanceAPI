import { CreateUserParams, ICreateUserRepository } from "../../../controllers/users/create-user/protocols";
import { MongoClient } from "../../../database/mongo";
import { User } from "../../../models/user";

export class MongoCreateUserRepository implements ICreateUserRepository{
    async createUser(params: CreateUserParams): Promise<Omit<User,"password">> {
        const {insertedId} =  await MongoClient.db
            .collection("users")
            .insertOne(params);    

        const user = await MongoClient.db
            .collection<Omit<User,"id">>("users")
            .findOne({_id:insertedId});

        if(!user){
            throw new Error("User not found");
        }

        const {_id,password,...rest} = user;
       
        return {id:_id.toHexString(), ...rest};
    }
}