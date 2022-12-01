import { AfterViewInit, Component, ElementRef, Injector, OnInit, ViewChild } from "@angular/core";
import { inject } from "@angular/core/testing";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { ConfirmationService, MessageService } from "primeng/api";
import { Table } from "primeng/table";
import { ApplicationUserDTO } from "src/app/model/ApplicationUserDTO";
import { UserType } from "src/app/model/UserType";
import { UserManagementService } from "src/app/service/app.user-managment.service";
import { CountryDropDownComponent } from "../country-dropdown/country-dropdown.component";
@Component({
  selector: 'app-base',
  template: ``,
  styles: [
  ] 
})
  export abstract class GenericManagementComponent implements OnInit, AfterViewInit {
    public userType:UserType ;
    public tmpApplicationUserDTO: ApplicationUserDTO[];
    public cloneApplicationUserDTO: { [s: string]: ApplicationUserDTO; } = {};
    public loadingTable: boolean = true;
    public displayNewUser: boolean = false;
    public isExpanded: boolean = false;
    public addNewUserForm: FormGroup | undefined;
    @ViewChild('countryDropDown') public countryDropDown: CountryDropDownComponent;
    public idFrozen: boolean = false;
    @ViewChild('dt1') public table: Table;
    @ViewChild('dropDownCountry') public dropDownCountry;
    @ViewChild('filter') public filter: ElementRef;
    public listOfApplicationUserDTO: ApplicationUserDTO[];
    public inProgressSavingUser: boolean = false;
    public abstract onSubmitaddNewApplicationUserDTOForm();

    public userManagementService: UserManagementService;
    public confirmationService: ConfirmationService;
    public messageService: MessageService;
    public formBuilder: FormBuilder;
    constructor(public injector: Injector) {
        this.confirmationService = injector.get(ConfirmationService);
        this.messageService = injector.get(MessageService);
        this.formBuilder = injector.get(FormBuilder);
        this.userManagementService = injector.get(UserManagementService);
         
    } 

    loadPageLazy( rows, from) {
        let thiss = this;
        this.userManagementService.loadUsersPerPage(this.userType,rows, from).subscribe(resp => {
            this.listOfApplicationUserDTO = <ApplicationUserDTO[]>resp;
            this.loadingTable = false;
        });
    } 

    onRowEditSave(applicationUserDTO: ApplicationUserDTO) {
        this.userManagementService.updateApplicationUser(applicationUserDTO).subscribe(resp => {
            this.cloneApplicationUserDTO[applicationUserDTO.id];
          this.messageService.add({ severity: 'success', summary: 'Success', detail: this.userType+'  is updated' });
        });
    
    
      }
    
    confirmDelete(applicationUserDTO: ApplicationUserDTO) {
        let thiss = this;
        this.confirmationService.confirm({
          message: 'Are you sure that you want to delete this '+this.userType+'?',
          accept: () => {
            thiss.userManagementService.deleteUserType(applicationUserDTO).subscribe(resp => {
              thiss.loadPageLazy(this.table._rows, 0);
            });
          }
        });
      }
    onRowEditInit(applicationUserDTO: ApplicationUserDTO) {
        this.cloneApplicationUserDTO[applicationUserDTO.id] = { ...applicationUserDTO };
    }
    onRowEditCancel(adminApplicationUserDTO: ApplicationUserDTO, index: number) {
        this.tmpApplicationUserDTO[index] = this.cloneApplicationUserDTO[adminApplicationUserDTO.id];
        this.cloneApplicationUserDTO[adminApplicationUserDTO.id];
    }
    ngOnInit(): void {
    
    }
    ngAfterViewInit() {
        let thiss = this;
        this.loadPageLazy(this.table._rows, 0);

    }

    onPage(event) {
        let thiss = this;
        this.loadPageLazy(this.table._rows, 0);

    }
    clear(table: Table) {
        table.clear();
    }


}