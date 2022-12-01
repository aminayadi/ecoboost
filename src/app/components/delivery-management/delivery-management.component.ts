import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ApplicationUserDTO } from 'src/app/model/ApplicationUserDTO';
import { UserType  } from 'src/app/model/UserType';
import { UserManagementService } from 'src/app/service/app.user-managment.service';
import { IconService } from '../../service/iconservice';
import { GenericManagementComponent } from '../generic-components/generic-managment-component/GenericManagementComponent';

@Component({
  selector: 'delivery-management',
  templateUrl: './delivery-management.component.html',
  providers: [UserManagementService, MessageService, ConfirmationService]
})
export class DeliveryManagementComponent extends GenericManagementComponent {

  constructor(public injector: Injector) {
    super(injector);
    this.userType = UserType.Delivery;
  }



  ngOnInit() {
    super.ngOnInit();  
    
    this.addNewUserForm = this.formBuilder.group({
      email: new FormControl("", [
        Validators.required
      ]),
      firstName: ["", Validators.required],
      lastName: ["", Validators.required], 'selectedCountry': new FormControl()
    });

  }





  onSubmitaddNewApplicationUserDTOForm() {
    this.inProgressSavingUser = true;
    let agentApplicationUserDTO: ApplicationUserDTO = new ApplicationUserDTO();
    agentApplicationUserDTO.email = this.addNewUserForm.value.email;
    agentApplicationUserDTO.firstName = this.addNewUserForm.value.firstName;
    agentApplicationUserDTO.lastName = this.addNewUserForm.value.lastName;
    agentApplicationUserDTO.userType=this.userType;
    agentApplicationUserDTO.countryDTO = this.addNewUserForm.value.selectedCountry;
    let thiss = this;
    this.userManagementService.createApplicationUser(agentApplicationUserDTO).subscribe(resp => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: this.userType+'  saved Successfully' });
      this.displayNewUser = false;
      this.inProgressSavingUser = false; 
      this.loadPageLazy(this.table._rows, 0);
      this.addNewUserForm.reset();
    });
  }


}
