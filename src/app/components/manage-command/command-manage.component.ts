import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppHelper } from 'src/app/AppHelper';
import { ApplicationUserDTO } from 'src/app/model/ApplicationUserDTO';
import { ProductDTO } from 'src/app/model/ProductDTO';
import { StockEntityPerProductDTO } from 'src/app/model/StockEntityPerProductDTO';
import { CommandDTO } from 'src/app/model/CommandDTO';
import { UserType } from 'src/app/model/UserType';
import { UserManagementService } from 'src/app/service/app.user-managment.service';
import { ProductService } from 'src/app/service/ProductService';
import { StockManagmentService } from 'src/app/service/StockManagmentService';
import { CommandManageService } from 'src/app/service/CommandManageService';
import { IconService } from '../../service/iconservice';
import { GenericManagementComponent } from '../generic-components/generic-managment-component/GenericManagementComponent';
import { CommandStatus } from 'src/app/model/CommandStatus';
import { BrokerService } from 'src/app/service/BrokerService'; 
import { NotificationService } from 'src/app/service/notificationService';

@Component({
  selector: 'command-manage',
  templateUrl: './command-manage.component.html',
  providers: [UserManagementService,  CommandManageService, ProductService, MessageService, ConfirmationService]
})
export class CommandManageComponent implements OnInit, AfterViewInit {
  @ViewChild('dtRequestStock') public table: Table;
  public loadingTable: boolean = true;
  public displayNewRequestStockButton: boolean;
  public commandDTOs: CommandDTO[];
  displayNewCommand: boolean = false
  public availableProducts: ProductDTO[];
  listOfDeliveries: ApplicationUserDTO[];
  selectedDelivery: ApplicationUserDTO;
  userType: UserType;
  showAssociateToDelivery: boolean = false;
  addNewRequestStockForm: any;
  selectedCommand: CommandDTO;
  constructor(private   notificationService: NotificationService,private brokerService: BrokerService, public commandManageService: CommandManageService, private confirmationService: ConfirmationService, private userManagementService: UserManagementService, public formBuilder: FormBuilder, public productService: ProductService, public messageService: MessageService) {

  }
  pickUpCommandByDelivery(commandDTO) {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        commandDTO.commandStatus = CommandStatus.PickedByDelivery;
        this.commandManageService.pickUpCommandByDelivery(commandDTO).subscribe(resp => {
          this.selectedCommand = null;
          this.displayNewCommand = false;

          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Command picked up Successfully' });
          this.loadCommands(this.table._rows, 0);

        });
      }
    });

  }
  validateCommandByAdmin(commandDTO) {
     
    this.brokerService.sendMessageToLoadNotification(55);  
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        commandDTO.commandStatus = CommandStatus.Closed;
        this.commandManageService.validateCommandByAdmin(commandDTO).subscribe(resp => {
          this.selectedCommand = null;
          this.displayNewCommand = false;
         
          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Command Closed Successfully' });
          this.loadCommands(this.table._rows, 0);

        });
      }
    });

  }
  onSelectAssocateWithDelivery() {
    this.confirmationService.confirm({
      message: 'Are you sure that you want to perform this action?',
      accept: () => {
        this.selectedCommand.relatedDelivery = this.selectedDelivery;
        this.selectedCommand.commandStatus = CommandStatus.ValidatedByAdmin;
        this.commandManageService.attachACommandToADelivery(this.selectedCommand).subscribe(resp => {
          this.selectedCommand = null;
          this.showAssociateToDelivery = false;

          this.messageService.add({ severity: 'success', summary: 'Success', detail: 'Command attached to delivery Successfully' });
          this.loadCommands(this.table._rows, 0);

        });
      }
    });

  }
  onClickAssciateWithDelivery(event: CommandDTO) {
    this.showAssociateToDelivery = true;
    this.selectedCommand = event;


  }

  onPage(event) {
    let thiss = this;
    this.loadCommands(this.table._rows, 0);

  }
  clear(table: Table) {
    table.clear();
  }
  ngAfterViewInit() {
    let thiss = this;
    this.loadCommands(this.table._rows, 0);

  }
  ngOnInit(): void {
    let applicationUser: ApplicationUserDTO = AppHelper.getConnectedUser();
    this.userType = applicationUser.userType;
    if (this.userType.toString() == UserType[UserType.Admin]) {
      this.userManagementService.listAllDelivery(applicationUser.id).subscribe(resp => {
        this.listOfDeliveries = <ApplicationUserDTO[]>resp;

      });
    }
    this.displayNewRequestStockButton = applicationUser.userType == UserType.Agent;
    this.productService.listAllProducts().subscribe(resp => {
      this.availableProducts = <ProductDTO[]>resp;

    });
    this.addNewRequestStockForm = this.formBuilder.group({
      stockQuantityInCarton: new FormControl(0, [
        Validators.required, Validators.pattern(/\-?\d*\.?\d{1,2}/)
      ]),
      stockQuantitySingle: [0, Validators.required],
      'selectedProduct': new FormControl()
    });

  }


  public onSubmitaddNewRequestStockForm() {
    let commandDTO: CommandDTO = new CommandDTO();
    commandDTO.stockQuantityInCarton = this.addNewRequestStockForm.value.stockQuantityInCarton;
    commandDTO.stockQuantitySingle = this.addNewRequestStockForm.value.stockQuantitySingle;
    commandDTO.relatedAgent = JSON.parse(localStorage.getItem("connectedUser"));
    commandDTO.productDTO = this.addNewRequestStockForm.value.selectedProduct;
    let thiss = this;
    this.commandManageService.createInitialCommand(commandDTO).subscribe((resp: any) => {
      if (resp.status != 'OK') {
        this.messageService.add({ severity: 'error', summary: 'Error', detail: 'You don\'t have enough stock on this product to command' });

      }
      else {
        this.messageService.add({ severity: 'success', summary: 'Success', detail: ' A new Stock Request saved Successfully' });
        this.displayNewCommand = false;
        this.loadCommands(this.table._rows, 0);
        this.addNewRequestStockForm.reset();
      }
    });
  }
  checkDisableButton(status,commandDTO:CommandDTO)
  {
    if(status=='onClickAssciateWithDelivery')
    { 
      if(commandDTO.commandStatus==='Created')
      { 
        return false;
      }
      else
      {
        return true;  
      }    
    }
    if(status=='validateCommandByAdmin')
    {
      if(commandDTO.commandStatus==='PickedByDelivery')
      {
        return false;
      }
      else
      {
        return true;
      }
    }
    return true;
  }
  loadCommands(rows: any, from: any) {
    let connectedUserObjectJson = localStorage.getItem("connectedUser");
    let connectedUserObject: ApplicationUserDTO = JSON.parse(connectedUserObjectJson);
    switch (connectedUserObject.userType.toString()) {
      case UserType[UserType.Agent]:
        this.commandManageService.listCommandsPerAgent(connectedUserObject.id, rows, from).subscribe(resp => {
          this.commandDTOs = <CommandDTO[]>resp;
          this.loadingTable = false;
        }); break;
      case UserType[UserType.Admin]:
        this.commandManageService.listCommandsPerAdmin(connectedUserObject.id, rows, from).subscribe(resp => {
          this.commandDTOs = <CommandDTO[]>resp;
          this.loadingTable = false;
        }); break;
      case UserType[UserType.Delivery]:
        this.commandManageService.listCommandsPerDelivery(connectedUserObject.id, rows, from).subscribe(resp => {
          this.commandDTOs = <CommandDTO[]>resp;
          this.loadingTable = false;
        }); break;
    }



  }

}

