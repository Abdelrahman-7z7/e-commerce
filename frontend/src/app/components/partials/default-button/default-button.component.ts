import { Component, EventEmitter, Input } from '@angular/core';

@Component({
  selector: 'default-button',
  templateUrl: './default-button.component.html',
  styleUrl: './default-button.component.css'
})
export class DefaultButtonComponent {

  @Input()
  type: 'submit' | 'button' = 'submit';

  @Input()
  text:string = "Submit";

  @Input()
  bgColor = "#222831";

  @Input()
  color = "#EEEEEE";

  @Input()
  fontSizeRem = 1.3;
  
  @Input()
  widthRem = 12;

  @Input()
  onClick = new EventEmitter;

  constructor(){

  }

  ngOnInit():void{}
}
