import dotenv from 'dotenv';
import express from 'express';
import path from 'path';
import cors from 'cors';
import foodRouter from './routers/food.router';
import userRouter from './routers/user.router';
import orderRouter from './routers/order.router';
import { dbConnect } from './configs/database.config';

dotenv.config();
console.log(process.env.MONGO_URL)

dbConnect();
// after this line go the terminal that is running to the backend server and check if you got the message "Connect successfully"


// all our APIs will be defined through this app
const app = express();

// node.js doesn't use an immediate version of express.json formate so we need to add this line
app.use(express.json());

// now our server is working through this localhost but we need to serve our backend on a different address
// localhost: 4200
// to localhost: 5000
// by default it is unacceptable to have request from an address to a different address
// that is the reason we need cors in here

app.use(cors({
    credentials: true,
    origin: ["http://localhost:4200"]
}))

app.use("/api/foods", foodRouter);
app.use("/api/users", userRouter);
app.use("/api/orders", orderRouter);

//app.use(express.static('public'));

// app.get('*', (req, res) => {
//     res.sendFile(path.join(__dirname,'public', 'index.html'))
// })

const port = process.env.PORT || 5001;
app.listen(port, () => {
    console.log("Website served on http://localhost:" + port);
})