import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { ToastrService } from 'ngx-toastr';
import { OrderService } from '../../../services/order.service';
import { CartService } from '../../../services/cart.service';
import { Route, Router } from '@angular/router';

//window.paypal // this is a variable for accessing the paypal window
declare var paypal:any;

@Component({
  selector: 'paypal-button',
  templateUrl: './paypal-button.component.html',
  styleUrl: './paypal-button.component.css'
})


export class PaypalButtonComponent {

  @Input()
  order!: Order;

  @ViewChild('paypal', {static:true})
  paypalElement!: ElementRef;

  constructor(
    private toastrService:ToastrService,
     private orderService:OrderService,
      private cartService:CartService,
      private router:Router){
  
  }

  ngOnInit(): void {
    const self = this;
    paypal
    .Buttons({
      // for getting the order's total price and setting the amount and the currency
      createOrder: (data: any, actions: any) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                currency_code: 'USD',
                value: self.order.totalPrice,
              },
            },
          ],
        });
      },

      // after the user click on the pay and everything is done, this function will be called 
      onApprove: async (data: any, actions: any) => {
        // actions.order.capture() will get the details of the payment for sending it to the server and save it on the server
        const payment = await actions.order.capture();
        // we set the id of the payment to the order payment id 
        this.order.paymentId = payment.id;
         
        self.orderService.pay(this.order).subscribe(
          {
            next: (orderId) => {
              // after paying the cart should become empty 
              this.cartService.clearCart();
              this.router.navigateByUrl('/track/' + orderId);
              this.toastrService.success(
                'Payment Saved Successfully',
                'Success'
              );
            },
            error: (error) => {
              this.toastrService.error('Payment Save Failed', 'Error');
            }
          }
        );
      },

      onError: (err: any) => {
        this.toastrService.error('Payment Failed', 'Error');
        console.log(err);
      },
    }) // the render function says where should I add this payment to which html tag
    .render(this.paypalElement.nativeElement);
    // since the paypal element is from the javascript so we need to get the nativeElement

  }

}
