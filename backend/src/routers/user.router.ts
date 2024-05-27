import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import bcrypt from 'bcryptjs';


const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if(usersCount> 0){
            res.send("Seed is already done!");
            return;
        }
                // in case if the foods didn't get loaded inside the database

        await UserModel.create(sample_users);
        res.send("Seed Is Done!");
    }
))

router.get("/", asyncHandler(
    async (req, res) => {
        const users = await UserModel.find();
        res.json(users);
    }
))


// post is an http method where we can send the body to the server for authenticating the user
router.post("/login", asyncHandler(
    async (req, res) => {
        // since we haven't used a database server yet we are going to create some users' samples inside the data.ts 
        
        // const body = req.body; // instead of this line JaveScript provide a cool way to use instance out of this variable (body.email and then body.password) we can use this

        const {email, password} = req.body; // destructuring assignment

        // const user = sample_users.find(user => user.email === email && user.password === password);
            
        // after connecting the server to the database
        const user = await UserModel.findOne({email});
        

        // for authentication and authorization

        // because the password that is being sent to the database is hashed password for security reasons
        // we need to use bcrypt method to compare between the database password and the password that is coming from the body request
        if(user && (await bcrypt.compare(password,user.password))) {
            res.send(generateTokenResponse(user));
        }
        else{
            res.status(HTTP_BAD_REQUEST).send("Username or password is invalid!");
        }
    
    }
  ))


router.post('/register', asyncHandler(
    async (req, res) => {
        const {name, email, password, address} = req.body;
        
        //checking for the uniqueness of the email
        const user = await UserModel.findOne({email});
        if(user){
            res.status(HTTP_BAD_REQUEST)
            .send('User is already exist, please login!');
            return;
        }
    
        const encryptedPassword = await bcrypt.hash(password, 10);
    
        const newUser:User = {
            id:'',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        //now let's add it to the database
        const dbUser = await UserModel.create(newUser);

        // to make the user automatically login after the registration
        res.send(generateTokenResponse(dbUser));
    }
  ))



const generateTokenResponse = (user : User) => {
    // install jwt (json web token)
    // terminal: npm install jsonwebtoken
    const token = jwt.sign(
        {
            id: user.id, email:user.email, isAdmin: user.isAdmin
        },
        // this is the secret key but it should be kept securely inside env file
        process.env.JWR_SECRET!,
        {
            //expire time,, meaning that this token will be expired after 30 days of being generated
             expiresIn:"30d"
        }
    );
    
    
    return {
      id: user.id,
      email: user.email,
      name: user.name,
      address: user.address,
      isAdmin: user.isAdmin,
      token: token
    };

   // return user;
}

export default router;
