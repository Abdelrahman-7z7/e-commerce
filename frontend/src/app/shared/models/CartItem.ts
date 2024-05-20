import { Food } from "./food";

export class CartItem{
    //instead of repiting the food variable we can make it public in the constructor
    // constructor(food:Food){
    //     this.food = food;
    // }
    // food!:Food;

    constructor(public food:Food){}
    quantity: number = 1;
    price:number = this.food.price;
}