import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent {
  searchTerm = '';
  // we make the second paramater private so it would only be accessaible inside this constructor
  constructor(activatedRoute:ActivatedRoute, private router:Router){
    activatedRoute.params.subscribe((params) =>{
      if(params.searchTerm){
        this.searchTerm = params.searchTerm;
      }
    })
  }

  gnOnInit(): void{}

  search(term:string):void{
    if(term){
      // in order to add the term inside our browser link
      this.router.navigateByUrl('/search/'+ term);
    }
  }


}
