import { Component, Input } from '@angular/core';
import { AbstractControl, FormControl } from '@angular/forms';

@Component({
  selector: 'text-input',
  templateUrl: './text-input.component.html',
  styleUrl: './text-input.component.css'
})
export class TextInputComponent {
  
  @Input()
  control!:AbstractControl;
  
  @Input()
  showErrorWhen:boolean = true;

  @Input()
  label!:string;

  @Input()
  type: 'text' | 'email' | 'password' = 'text';


  // we are just casting the Control as a FormControl type
  get formControl(){
    return this.control as FormControl;
  }
  
  constructor() { }

  ngOnInit(): void {
  }

}
