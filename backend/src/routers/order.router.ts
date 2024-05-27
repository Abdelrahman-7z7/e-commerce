import {Router} from 'express'
import asyncHandler from 'express-async-handler'
import { HTTP_BAD_REQUEST } from '../constants/http_status';
import { OrderModel } from '../models/order.model';
import { OrderStatusEnum } from '../constants/order_status';
import auth from '../middlewares/auth.mid';

const router = Router();
// the auth insure that the user is logged in and we verify the token and decode it in order to get the id of the current user
router.use(auth);

router.post('/create', 
    asyncHandler(
        async (req:any, res:any) => {
            const requestOrder = req.body;

            if(requestOrder.items.length <= 0){
                res.status(HTTP_BAD_REQUEST).send('Cart Is Empty');
                return;
            }
            // save the new Order

            await OrderModel.deleteOne({
                user: req.user.id,
                status: OrderStatusEnum.NEW
            })

            // {...} which is a spread operator with request order and give it the user from request that I 
            const newOrder = new OrderModel({...requestOrder, user: req.user.id});
            //let's save the new order
            await newOrder.save();
            //send it to the client
            res.send(newOrder);
        }
    )
)

router.get('/newOrderForCurrentUser', asyncHandler(
    async (req:any, res:any) => {
        const order = await getNewOrderForCurrentUser(req)
        //availability of the order
        if(order) res.send(order);
        else res.status(HTTP_BAD_REQUEST).send();
    }
))


router.post('/pay', asyncHandler(
    async(req:any , res) => {
        const {paymentId} = req.body;
        const order = await getNewOrderForCurrentUser(req);

        if(!order){
            res.status(HTTP_BAD_REQUEST).send('Order Not Found!')
            return;
        }

        order.paymentId = paymentId;
        order.status = OrderStatusEnum.PAYED;
        await order.save();

        // we need to send the id of the order to redirect the user to the track page
        res.send(order._id);
    }
))

router.get('/track/:id', asyncHandler(
    async (req:any, res) => {
        const order = await OrderModel.findOne(req.params.id);
        res.send(order);
    }
))

export default router;

async function getNewOrderForCurrentUser(req: any) {
    return await OrderModel.findOne({
        user: req.user.id,
        status: OrderStatusEnum.NEW
    });
}

