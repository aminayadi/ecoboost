import { AfterViewInit, Component, Injector, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { AppHelper } from 'src/app/AppHelper';
import { ApplicationUserDTO } from 'src/app/model/ApplicationUserDTO';
import { ProductDTO } from 'src/app/model/ProductDTO';
import { StockEntityPerProductDTO } from 'src/app/model/StockEntityPerProductDTO';
import { StockRequestDTO } from 'src/app/model/StockRequestDTO';
import { UserType     } from 'src/app/model/UserType';
import { UserManagementService } from 'src/app/service/app.user-managment.service';
import { ProductService } from 'src/app/service/ProductService';
import { StockManagmentService } from 'src/app/service/StockManagmentService';
import { StockRequestService } from 'src/app/service/StockRequestService';
import { IconService } from '../../service/iconservice';
import { GenericManagementComponent } from '../generic-components/generic-managment-component/GenericManagementComponent';

@Component({
  selector: 'stock-request',
  templateUrl: './stock-request.component.html',
  providers: [UserManagementService, StockRequestService, ProductService, MessageService, ConfirmationService]
})
export class StockRequestComponent implements OnInit, AfterViewInit {
  @ViewChild('dtRequestStock') public table: Table;
  public loadingTable: boolean = true;
  public displayNewRequestStockButton: boolean;
  public stockRequests: StockRequestDTO[];
  displayNewRequestStock: boolean = false
  public availableProducts: ProductDTO[];
  listOfDeliveries:ApplicationUserDTO [];
  selectedDelivery:ApplicationUserDTO; 
  isAdmin: boolean = false;
  showAssociateToDelivery: boolean = false;
  addNewRequestStockForm: any;
  constructor(public stockRequestService: StockRequestService,private userManagementService:UserManagementService, public formBuilder: FormBuilder, public productService: ProductService, public messageService: MessageService) {

  }
  onClickAssociateDeliveryToStockRequest()
  {

  }

  onPage(event) {
    let thiss = this;
    this.loadStockRequests(this.table._rows, 0);

  }
  clear(table: Table) {
    table.clear();
  }
  ngAfterViewInit() {
    let thiss = this;
    this.loadStockRequests(this.table._rows, 0);

  }
  ngOnInit(): void {
    let applicationUser: ApplicationUserDTO = AppHelper.getConnectedUser();
    this.isAdmin=applicationUser.userType==UserType.Admin;
    if(this.isAdmin)
    {
      this.userManagementService.listAllDelivery(applicationUser.id).subscribe(resp => {
        this.listOfDeliveries = <ApplicationUserDTO[]>resp;
  
      });
    }
    this.displayNewRequestStockButton = applicationUser.userType == UserType.Agent;
    this.productService.listAllProducts().subscribe(resp => {
      this.availableProducts = <ProductDTO[]>resp;

    });
    this.addNewRequestStockForm = this.formBuilder.group({
      stockQuantityInCarton: new FormControl("", [
        Validators.required
      ]),
      stockQuantitySingle: ["", Validators.required],
      'selectedProduct': new FormControl()
    });

  }


  public onSubmitaddNewRequestStockForm() {
    let stockRequestDTO: StockRequestDTO = new StockRequestDTO();
    stockRequestDTO.stockQuantityInCarton = this.addNewRequestStockForm.value.stockQuantityInCarton;
    stockRequestDTO.stockQuantitySingle = this.addNewRequestStockForm.value.stockQuantitySingle;
    stockRequestDTO.relatedAgent = JSON.parse(localStorage.getItem("connectedUser"));
    stockRequestDTO.productDTO = this.addNewRequestStockForm.value.selectedProduct;
    let thiss = this;
    this.stockRequestService.createInitialStockRequest(stockRequestDTO).subscribe(resp => {
      this.messageService.add({ severity: 'success', summary: 'Success', detail: ' A new Stock Request saved Successfully' });
      this.displayNewRequestStock = false;
      this.loadStockRequests(this.table._rows, 0);
      this.addNewRequestStockForm.reset();
    });
  }

  loadStockRequests(rows: any, from: any) {
    let connectedUserObjectJson = localStorage.getItem("connectedUser");
    let connectedUserObject: ApplicationUserDTO = JSON.parse(connectedUserObjectJson);
    switch (connectedUserObject.userType) {
      case UserType.Agent:
        this.stockRequestService.listStockRequestPerAgent(connectedUserObject.id, rows, from).subscribe(resp => {
          this.stockRequests = <StockRequestDTO[]>resp;
          this.loadingTable = false;
        }); break;
      case UserType.Admin:
        this.stockRequestService.listStockRequestPerAdmin(connectedUserObject.id, rows, from).subscribe(resp => {
          this.stockRequests = <StockRequestDTO[]>resp;
          this.loadingTable = false;
        }); break;
    }



  }

}

