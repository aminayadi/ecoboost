import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { ApplicationUserDTO } from 'src/app/model/ApplicationUserDTO';
import { UserManagementService } from 'src/app/service/app.user-managment.service';

import { MessageService } from 'primeng/api';
import { AppHelper } from 'src/app/AppHelper';
import { ConfirmationService } from 'primeng/api';
import { CountryDropDownComponent } from '../generic-components/country-dropdown/country-dropdown.component';
import { GenericManagementComponent } from '../generic-components/generic-managment-component/GenericManagementComponent';
import { UserType } from 'src/app/model/UserType';
@Component({
  selector: 'admin-management.component',
  templateUrl: './admin-management.component.html',
  styleUrls: ["./admin-management.component.scss"],
  providers: [UserManagementService, MessageService, ConfirmationService]
})

export class AdminManagementComponent extends GenericManagementComponent {
  datas = [ 1, 2 ];
  dropdownOptions = [
      { label: 'X', value: 1 },{ label: 'X', value: 1 },{ label: 'X', value: 1 },{ label: 'X', value: 1 },{ label: 'X', value: 1 },{ label: 'X', value: 1 },{ label: 'X', value: 1 },
      { label: 'Y', value: 2 },
  ];
  constructor(public injector: Injector) {
    super(injector);
    this.userType = UserType.Admin;
  }



  ngOnInit() {
    super.ngOnInit();

    this.addNewUserForm = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required,
        Validators.minLength(3), Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$")
      ]),
      firstName: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]),
      phone: new FormControl("", [ 
      ]),
      address: new FormControl("", [
       
      ]),
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]), 'selectedCountry': new FormControl("", [
        Validators.required
      ])
    });

  }





  onSubmitaddNewApplicationUserDTOForm() {
    this.inProgressSavingUser = true;
    let adminApplicationUserDTO: ApplicationUserDTO = new ApplicationUserDTO();
    adminApplicationUserDTO.email = this.addNewUserForm.value.email;
    adminApplicationUserDTO.firstName = this.addNewUserForm.value.firstName;
    adminApplicationUserDTO.lastName = this.addNewUserForm.value.lastName;
    adminApplicationUserDTO.userType = this.userType;
    adminApplicationUserDTO.countryDTO = this.addNewUserForm.value.selectedCountry;
    adminApplicationUserDTO.phone= this.addNewUserForm.value.phone;
    adminApplicationUserDTO.address= this.addNewUserForm.value.address;
    let thiss = this;
    this.userManagementService.createApplicationUser(adminApplicationUserDTO).subscribe(resp => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: this.userType + '  saved Successfully' });
      this.displayNewUser = false;
      this.inProgressSavingUser = false;
      this.loadPageLazy(this.table._rows, 0);
      this.addNewUserForm.reset();
    });
  }


}
