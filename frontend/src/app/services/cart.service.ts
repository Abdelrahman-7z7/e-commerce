import { Injectable } from '@angular/core';
import {cart} from '../shared/models/Cart'
import { BehaviorSubject, Observable } from 'rxjs';
import { Food } from '../shared/models/food';
import { CartItem } from '../shared/models/CartItem';
import { CurrencyPipe } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  // define a field that holds the cart
  private cart:cart = this.getCartFromLocalStorage();
  private cartSubject: BehaviorSubject<cart> = new BehaviorSubject(this.cart);
  constructor(){}

  // adding to cart functionality
  addToCart(food:Food){
    let cartItem = this.cart.items.find(item => item.food.id === food.id);
    
    // we need to check if the food is already in the cart then no need to add it again
    if (cartItem)
      return;

    //otherwise we need to push the item inside the cart
    this.cart.items.push(new CartItem(food));
    //for any update
    this.setCartToLocalStorage();
  }

  // removing from the cart functionality
  removeFromCart(foodId: string):void{
    this.cart.items = this.cart.items.filter(item => item.food.id != foodId);
    //for any update 
    this.setCartToLocalStorage();
  }

  changeQuantity(foodId:string, quantity:number){
    let cartItem = this.cart.items.find(item => item.food.id === foodId);
    // if cartItem is not available then we return, normally it wouldnt happen but for bypassing the compile errors of the typescript we need to do this check 
    if(!cartItem) return;

    cartItem.quantity = quantity;
    cartItem.price = quantity* cartItem.food.price;

    this.setCartToLocalStorage();
  }

  clearCart(){
    this.cart = new cart();
    this.setCartToLocalStorage();
  }

  //The 'Observable' type represents a stream of values over time. It's used extensively in Angular for handling asynchronous data such as HTTP requests, and event handling.

  // we send it as observable because if we send the subject to the outside we could be able to change the value of the subject from outside of the card service, we dont want this to happen bacause any changes to the cart should happen inside the cart series.

  getCartObservable():Observable<cart>{
    return this.cartSubject.asObservable();
  }

  // the cartSubject always keeps the latest value of the cart
  // we don't need to work with cartObservable when we want the latest value only
  getCart():cart{
    return this.cartSubject.value;
  }

  // we need to preserve the card at the local storage and another method to get the cart from the local storage in case of any refresh to the browser

  private setCartToLocalStorage():void{
    // we need to set the totalPrice 
    // reduce(accumulator that has prevSum, the currentItem)
    // the 0 is the default value
    this.cart.totalPrice = this.cart.items.reduce((prevSum, CurrencyItem) => prevSum + CurrencyItem.price, 0);

    // we need to do the same thig for the total quantity
    this.cart.totalCount = this.cart.items.reduce((prevSum, currentItem) => prevSum + currentItem.quantity, 0);

    const cartJson = JSON.stringify(this.cart);
    localStorage.setItem('Cart', cartJson);

    // in order to update the card we are gonna use the next method 
    this.cartSubject.next(this.cart);
  }

  private getCartFromLocalStorage():cart{

    if (typeof localStorage !== 'undefined') {
      const cartJSON = localStorage.getItem('Cart');
          //check if the cartJSON available and then convert it to cart object, or just return an empty cart

      return cartJSON ? JSON.parse(cartJSON) : new cart();
    } else {
      return new cart(); // Fallback for environments where localStorage is not defined
    }

    // const cartJSON = localStorage.getItem('Cart');
    // //check if the cartJSON available and then convert it to cart object, or just return an empty cart
    // return cartJSON? JSON.parse(cartJSON): new cart();
  }
}
