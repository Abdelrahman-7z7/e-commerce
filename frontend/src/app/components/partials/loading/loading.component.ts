import { Component } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css'
})
export class LoadingComponent {

  isLoading!: Boolean;

  constructor(loadingService:LoadingService){
    loadingService.isLoading.subscribe((isLoading) => {
      this.isLoading = isLoading;
    });
    //this line was for testing and designing the style
    //loadingService.showLoading();

  }

  ngOnInit():void{}
}
