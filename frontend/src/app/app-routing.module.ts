import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/pages/home/home.component';
import { FoodPageComponent } from './components/pages/food-page/food-page.component';
import { CartPageComponent } from './components/pages/cart-page/cart-page.component';

const routes: Routes = [
  //the path of empty '', means the home page of the application
  {path:'', component:HomeComponent},
  {path: 'search/:searchTerm', component:HomeComponent},
  {path:'food/:id', component:FoodPageComponent},
  // first tag will refer to the .../tag , and the second will be for the chosen :tag .../tag/FastFood
  {path:'tag/:tag', component:HomeComponent},
  {path:'cart-page', component:CartPageComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
