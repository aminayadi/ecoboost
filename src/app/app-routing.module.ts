import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { DashboardComponent } from './components/dashboard/dashboard.component';
 
import { AppMainComponent } from './app.main.component';
 
import { IconsComponent } from './components/icons/icons.component'; 
import { LoginComponent } from './components/login/login.component';
import { AppCodeComponent } from './components/app-code/app.code.component';
import { AuthGuard } from './service/app.auth.guard';
import { AgentManagementComponent } from './components/agent-management/agent-management.component';
import { AdminManagementComponent } from './components/admin-management/admin-management.component';
import { ManagerManagementComponent } from './components/manager-management/manager-management.component';
import { DeliveryManagementComponent } from './components/delivery-management/delivery-management.component';
import { ManageStockComponent } from './components/manage-stock/manage-stock.component';
import { CommandManageComponent } from './components/manage-command/command-manage.component';
 
@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: LoginComponent 
            },    
            {path:'mainapp', canActivate: [AuthGuard],component: AppMainComponent,
            children: [
                {path: '', canActivate: [AuthGuard],component: DashboardComponent},
               
                {path: 'admin-management',  canActivate: [AuthGuard],component: AdminManagementComponent} ,
                {path: 'agent-management',  canActivate: [AuthGuard],component: AgentManagementComponent} ,
                {path: 'manager-management',  canActivate: [AuthGuard],component: ManagerManagementComponent} ,
                {path: 'delivery-management',  canActivate: [AuthGuard],component: DeliveryManagementComponent} ,
                {path: 'manager-stock',  canActivate: [AuthGuard],component: ManageStockComponent} ,
                {path: 'manage-command',  canActivate: [AuthGuard],component: CommandManageComponent} ,
                {path: 'icons', component: IconsComponent},
                
            ],},
            {path: '**', redirectTo: 'pages/notfound'},
        ], {scrollPositionRestoration: 'enabled', anchorScrolling:'enabled'})
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
