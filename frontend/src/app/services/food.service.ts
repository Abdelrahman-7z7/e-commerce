import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags} from '../../data';
import { sample } from 'rxjs';
import { Tag } from '../shared/models/Tag';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor() { }

  getAll(): Food[]{
    return sample_foods;
  }

  // this method will work with the search bar in order to find if the searchTerm is included in the food service
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.getAll().filter(food => food.name.toLowerCase().includes(searchTerm.toLowerCase()))
  }

  getAllTags(): Tag[]{
    return sample_tags;
  }

  getAllFoodsByTag(tag:string): Food[]{
    
    // if the tag equal all then return all the food, otherwise search on the suitable foods for the tag 
    return tag === "All"?
      this.getAll():
      this.getAll().filter(food => food.tags?.includes(tag));
  }

  getFoodById(foodId:string): Food{
    // when the first food is not defined we will return a new Food
    // ?? => when some variable is null or underfined or nither of them the expresseion will return the defult value which is the one after the double question-marks
    return this.getAll().find(food => food.id == foodId) ?? new Food();
  }



}
