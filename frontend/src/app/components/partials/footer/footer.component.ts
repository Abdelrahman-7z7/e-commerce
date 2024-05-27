import { Component } from '@angular/core';
import { footer_elements } from '../../../../data';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent {

  footerElements = footer_elements;

  constructor(){

  }

  ngOnInit():void{}
}
