import { CartItem } from "./CartItem";

export class cart{
    // we set it to [] so its default value will be empty array instead of setting it to {} and that will give an undefined default value
    items:CartItem[] = [];
    totalPrice: number = 0;
    totalCount: number = 0;
}