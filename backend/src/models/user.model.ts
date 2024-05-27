import { Schema, model } from "mongoose";

// TODO: we need to create the following:

// interface
export interface User{
    id:string;
    email:string;
    //but we have a password
    password:string;
    name:string;
    address:string;
    //on the server we don't save the token on the database
    //token:string;
    isAdmin:boolean
}

//Schema
export const UserSchema = new Schema<User>(
    {
        name: {type:String, required:true},
        email: {type:String, required:true, unique:true},
        address: {type:String, required:true},
        password: {type:String, required:true},
        isAdmin: {type:Boolean, required:true},
    }, {
        timestamps:true,
        toJSON:{
            virtuals:true
        },
        toObject:{
            virtuals:true
        }
    }
);

//Model
//NOTE: I CHANGED HERE LATELY 'User' to 'user'
export const UserModel = model<User>('user', UserSchema);