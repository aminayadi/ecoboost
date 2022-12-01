import { Component, forwardRef, Input, OnInit, SkipSelf } from '@angular/core'; 
import { ControlContainer, ControlValueAccessor, FormGroupDirective, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Dropdown } from 'primeng/dropdown'; 
 
import { AppHelper } from 'src/app/AppHelper';
import { CountryDTO } from 'src/app/model/CountryDTO';
export const CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR: any = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => CountryDropDownComponent),
  multi: true
};

@Component({
  selector: 'country-dropdown',
  templateUrl: './country-dropdown.component.html',  
  styleUrls: ["./country-dropdown.component.scss"]
  , providers: [
    CUSTOM_INPUT_CONTROL_VALUE_ACCESSOR,

  
  
] 

})
export class CountryDropDownComponent implements  ControlValueAccessor  {
  
  availableCountries:Array<any>;
 
  innerValue :CountryDTO;
  constructor( ) { this.availableCountries=AppHelper.countries;}
  
  private onTouchedCallback: () => void = noOp;
  private onChangeCallback: (_: any) => void = noOp;
 

  registerOnChange(fn: any): void {
    this.onChangeCallback = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouchedCallback = fn;
  }
  handleChange(  change: any) {
    this.onTouchedCallback(); 
    this.innerValue=change;
  //  this.options[itemIndex].modes[modeIndex].enabled = change;
    this.onChangeCallback(this.innerValue);
  }
  setDisabledState(isDisabled: boolean): void { 
console.log("dd");

   }

  writeValue(value: any) {
    if (value != this.innerValue) {
      this.innerValue = value;
    }
  }
  

}
var noOp = () => { 

console.log("ss"); 

};