import { Component } from '@angular/core';
import { Food } from '../../../shared/models/food';
import { FoodService } from '../../../services/food.service';
import { ActivatedRoute } from '@angular/router';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
    foods:Food[] = [];
    // will look at the type that is used inside the constructor and give this variable a new instance of foodService, we don't need to instantiate 
    constructor(private foodService: FoodService, activatedRouter:ActivatedRoute){
      //subscribe means anytime when the params changed call the function that inside the subscribe
      activatedRouter.params.subscribe((params) => {
        if(params.searchTerm){
          //to give us the filtered result based on the searchTerm
          this.foods = this.foodService.getAllFoodsBySearchTerm(params.searchTerm);
        }else if(params.tag){
          this.foods = this.foodService.getAllFoodsByTag(params.tag);
        } else{
          //default action
          // now foods variable is filled with the data from the food service that uses sample foods'data
           this.foods = foodService.getAll();
        }
      })
      
    };
    ngOnInit(): void{}
}
