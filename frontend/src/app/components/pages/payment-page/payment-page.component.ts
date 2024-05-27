import { Component } from '@angular/core';
import { Order } from '../../../shared/models/Order';
import { OrderService } from '../../../services/order.service';
import { Router } from '@angular/router';
import { error } from 'console';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-payment-page',
  templateUrl: './payment-page.component.html',
  styleUrl: './payment-page.component.css'
})
export class PaymentPageComponent {

  order:Order = new Order();

  constructor(orderService:OrderService, router:Router, private toastrService:ToastrService){
    orderService.getNewOrderForCurrentUser().subscribe({
      next: (order) => {
        this.order = order;
      },
      error: (errorResponse) => {
        this.toastrService.error(errorResponse.error, 'payment');
        router.navigateByUrl('/checkout');
      }
    })
  }

  ngOnInit():void {}
}
