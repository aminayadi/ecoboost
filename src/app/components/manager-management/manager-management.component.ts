import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Table } from 'primeng/table';
import { ApplicationUserDTO } from 'src/app/model/ApplicationUserDTO';
import { UserManagementService } from 'src/app/service/app.user-managment.service';

import { ConfirmationService, MessageService } from 'primeng/api';
import { GenericManagementComponent } from '../generic-components/generic-managment-component/GenericManagementComponent';
import { UserType } from 'src/app/model/UserType';
@Component({
  selector: 'manager-management.component',
  templateUrl: './manager-management.component.html',
  styleUrls: ["./manager-management.component.scss"],
  providers: [UserManagementService, MessageService, ConfirmationService]
})
export class ManagerManagementComponent extends GenericManagementComponent {

  constructor(public injector: Injector) {
    super(injector);
    super.userType = UserType.Manager;
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
      lastName: new FormControl("", [
        Validators.required,
        Validators.minLength(3)
      ]) 
    });


  }




  onSubmitaddNewApplicationUserDTOForm() {
    this.inProgressSavingUser = true;
    let aplicationUserDTO: ApplicationUserDTO = new ApplicationUserDTO();
    aplicationUserDTO.email = this.addNewUserForm.value.email;
    aplicationUserDTO.firstName = this.addNewUserForm.value.firstName;
    aplicationUserDTO.lastName = this.addNewUserForm.value.lastName;
    aplicationUserDTO.userType = UserType.Manager;
    const applicationUserDTO: ApplicationUserDTO = JSON.parse(sessionStorage.getItem('connectedUser'));
    aplicationUserDTO.countryDTO = applicationUserDTO.countryDTO;
    let thiss = this;
    this.userManagementService.createApplicationUser(aplicationUserDTO).subscribe(resp => {
      thiss.messageService.add({ severity: 'success', summary: 'Success', detail: this.userType + '  saved Successfully' });
      thiss.displayNewUser = false;
      thiss.inProgressSavingUser = false;
      thiss.loadPageLazy(thiss.table._rows, 0);
      thiss.addNewUserForm.reset();
    });
  }


}
