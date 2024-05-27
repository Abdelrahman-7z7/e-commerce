import { Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { AbstractControl, MinLengthValidator } from '@angular/forms';

const VALIDATOR_MESSAGE: any = {
  required:'Should not be empty',
  email:'Email is not valid',
  minlength: 'Field is too short',
  notMatch: 'Password and Confirm does not match'
}

@Component({
  selector: 'input-validation',
  templateUrl: './input-validation.component.html',
  styleUrl: './input-validation.component.css'
})
export class InputValidationComponent implements OnInit, OnChanges {

  @Input()
  control!:AbstractControl;

  @Input()
  showErrorWhen:boolean = true;

  errorMessages:string[] = [];

  constructor(){}
  ngOnChanges(changes: SimpleChanges): void {
    this.checkValidation();
  }
  ngOnInit():void{
    // when any of the status get change the checkValidation method will be called
    this.control.statusChanges.subscribe(()=>{
      this.checkValidation();
    });

    //when a value be entered to the input, this method will be called to check out the validation
    this.control.valueChanges.subscribe(()=>{
      this.checkValidation();
    })
  }

  checkValidation():void{
    const errors = this.control.errors;

    if(!errors){
      this.errorMessages = [];
      return;
    }

    const errorKeys = Object.keys(errors);
    // ['required', 'email']
    this.errorMessages = errorKeys.map( key => VALIDATOR_MESSAGE[key]);
    // this depending on the key if it is required, then we print 'should not be empty'
    // if the key error equal to email, then we print 'Email is not valid'
  }

}
