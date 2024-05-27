import {Types, Schema, model, Model} from 'mongoose';
import { Food, FoodSchema } from './food.model';
import { OrderStatusEnum } from '../constants/order_status';



interface INumber {
    coordinates: [number, number]; // An array of two numbers (floats)
}

interface NumberModel extends Model<INumber>, INumber {}

const numberSchema = new Schema<INumber, NumberModel>({
    coordinates: [{ type: Number, required: true }],
});


export interface OrderItem{
    food: Food;
    price: number;
    quantity: number
}

export const OrderItemSchema = new Schema<OrderItem>(

    {
        food:{type: FoodSchema, required: true},
        price: {type: Number, required: true},
        quantity: {type:Number, required: true}
    }
)



export interface Order{
    id:number;
    items: OrderItem[];
    totalPrice:number;
    name:string
    address:string;
    addressLatLng: [number, number]; // this is the type of Coordinate that is holding the location from ol library 
    paymentId:string;
    status:OrderStatusEnum;
    user: Types.ObjectId; // will be used for foreign key //type script type
    createdAt: Date;
    updatedAt: Date;
}

const orderSchema = new Schema<Order>({
    name: {type:String, required:true},
    address: {type:String, required:true},
    addressLatLng: {type: [Number], required:true},
    paymentId: {type:String},
    totalPrice: {type:Number, required:true},
    items: {type: [OrderItemSchema], required:true},
    status: {type: String, default: OrderStatusEnum.NEW},
    user: {type: Schema.Types.ObjectId, required: true}, //type schema type 
}, {
    timestamps: true,
    toJSON:{
        virtuals:true
    },
    toObject:{
        virtuals:true
    }
})


export const OrderModel = model('order', orderSchema);