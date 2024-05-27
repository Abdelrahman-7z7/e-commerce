import { Coordinate } from "ol/coordinate";
import { CartItem } from "./CartItem"

export class Order{
    id!:number;
    items!: CartItem[];
    totalPrice!:number;
    name!:string
    address!:string;
    addressLatLng?:Coordinate; // this is the type of Coordinate that is holding the location from ol library 
    paymentId!:string;
    createdAt!:string;
    status!:string;
}