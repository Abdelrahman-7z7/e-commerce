import { Schema, model } from "mongoose";

// TODO: we need to create the following:

// interface
export interface Food{
    //we identify that is required by adding an "!" mark 
    id:string;
    name:string;
    price:number;
    //we add "?" to define that is optional
    tags:string[];
    favorite:boolean;
    stars:number;
    imageUrl:string;
    origins:string[];
    cookTime:string
}

// schema
export const FoodSchema = new Schema<Food>(
    //under line id is already a part of the Schema
    {
        name: {type: String, required:true},
        price: {type: Number, required:true},
        tags: {type: [String]},
        favorite: {type: Boolean, default:false},
        stars: {type: Number, required:true},
        imageUrl: {type: String, required:true},
        origins: {type: [String], required:true},
        cookTime: {type: String, required:true},    
    },{
        // by default the mongoose will set the under line id === id
        toJSON:{
            virtuals:true
        },
        toObject: { // when you get a value from the database and you want to work with it inside your code
            virtuals:true
        }, 
        // and for each model I want to set when they are created or updated 
        timestamps:true
    }
);

// model
export const FoodModel = model<Food>('food', FoodSchema);