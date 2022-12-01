import { Component, Injector, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ConfirmationService, MessageService } from 'primeng/api';
import { Table } from 'primeng/table';
import { ApplicationUserDTO } from 'src/app/model/ApplicationUserDTO';
import { StockEntityPerProductDTO } from 'src/app/model/StockEntityPerProductDTO';
import { UserType } from 'src/app/model/UserType';
import { UserManagementService } from 'src/app/service/app.user-managment.service';
import { StockManagmentService } from 'src/app/service/StockManagmentService';
import { IconService } from '../../service/iconservice';
import { GenericManagementComponent } from '../generic-components/generic-managment-component/GenericManagementComponent';

@Component({
  selector: 'manage-stock',
  templateUrl: './manage-stock.component.html',
  providers: [UserManagementService, StockManagmentService, MessageService, ConfirmationService]
})
export class ManageStockComponent implements OnInit {
  public loadingTable: boolean = true;
  public tmpStockManagment : StockEntityPerProductDTO[];
 
  public cloneStockManagment : { [s: string]: StockEntityPerProductDTO; } = {};
  stocks: Array<StockEntityPerProductDTO>
  constructor(public stockManagmentService: StockManagmentService,public messageService:MessageService) { 
 
  }
  onRowEditInit(stockEntityPerProductDTO: StockEntityPerProductDTO) {
  this.cloneStockManagment[stockEntityPerProductDTO.id] = { ...stockEntityPerProductDTO };
}

onPage(event) {
  let thiss = this;
  this.loadStocks();
  this.loadStocks();

}
clear(table: Table) {
  table.clear();
}
onRowEditCancel(adminApplicationUserDTO: StockEntityPerProductDTO, index: number) {
    this.tmpStockManagment[index] = this.cloneStockManagment[adminApplicationUserDTO.id];
    this.cloneStockManagment[adminApplicationUserDTO.id];
}
  ngOnInit(): void {
   this.loadStocks();
  }

  onRowEditSave(stockEntityPerProductDTO: StockEntityPerProductDTO) {
    this.stockManagmentService.updateStockEntityPerProductDTO(stockEntityPerProductDTO).subscribe(resp => {
        this.cloneStockManagment[stockEntityPerProductDTO.id];
      this.messageService.add({ severity: 'success', summary: 'Success', detail: ' Stock for product '+stockEntityPerProductDTO.productDTO.name +' update  is updated' });
    });


  }

 
  loadStocks() {
  let connectedUserObjectJson = localStorage.getItem("connectedUser");
  let connectedUserObject: ApplicationUserDTO = JSON.parse(connectedUserObjectJson);
  this.stockManagmentService.listAllStockEntityPerProductDTO(connectedUserObject.id).subscribe(resp => {
    this.stocks = <StockEntityPerProductDTO[]>resp;
    this.loadingTable = false;
  });
}

}