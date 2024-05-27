import { Injectable } from '@angular/core';
import { Food } from '../shared/models/food';
import { sample_foods, sample_tags} from '../../data';
import { Observable, sample } from 'rxjs';
import { Tag } from '../shared/models/Tag';
import { FOODS_BY_ID_URL, FOODS_BY_SEARCH_URL, FOODS_BY_TAGS_URL, FOODS_TAGS_URL, FOODS_URL } from '../shared/constants/urls';
import { HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FoodService {

  constructor(private http:HttpClient) {

   }

  getAll(): Observable<Food[]>{
    return this.http.get<Food[]>(FOODS_URL);
  }

  // this method will work with the search bar in order to find if the searchTerm is included in the food service
  getAllFoodsBySearchTerm(searchTerm:string){
    return this.http.get<Food[]>(FOODS_BY_SEARCH_URL + searchTerm);
  }

  getAllTags(): Observable<Tag[]>{
    return this.http.get<Tag[]>(FOODS_TAGS_URL);
  }

  getAllFoodsByTag(tag:string): Observable<Food[]>{
    
    // if the tag equal all then return all the food, otherwise search on the suitable foods for the tag 
    return tag === "All"?
      this.getAll():
      this.http.get<Food[]>(FOODS_BY_TAGS_URL + tag);
  }

  getFoodById(foodId:string): Observable<Food>{
    // when the first food is not defined we will return a new Food
    // ?? => when some variable is null or undefined or neither of them the expression will return the default value which is the one after the double question-marks
    return this.http.get<Food>(FOODS_BY_ID_URL + foodId);
    // it is just a one food not a foods array
  }



}
