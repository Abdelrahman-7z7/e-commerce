// we need it to make connection to the mongoDB server
import {connect, ConnectOptions} from 'mongoose'
import { UserModel } from '../models/user.model';
import { FoodModel } from '../models/food.model';

const mongoose = require('mongoose');

mongoose.set('debug', true);


export const dbConnect = () => {
    // ! refers to that the value is always available 
    connect(process.env.MONGO_URL!, {
        useNewUrlParser: true,
        useUnifiedTopology:true
    } as ConnectOptions).then(
      () => console.log("connect successfully"),
      (error) => console.log(error)
    );
}

// then we need to connect this function inside the server.ts