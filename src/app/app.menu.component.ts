import { Component, OnInit } from '@angular/core';
import { AppMainComponent } from './app.main.component';
import { IconsComponent } from './components/icons/icons.component';
import { ApplicationUserDTO } from './model/ApplicationUserDTO';
import { UserType } from './model/UserType';

@Component({
    selector: 'app-menu',
    template: `
        <div class="layout-menu-container">
            <ul class="layout-menu" role="menu" (keydown)="onKeydown($event)">
                <li app-menu class="layout-menuitem-category" *ngFor="let item of model; let i = index;" [item]="item" [index]="i" [root]="true" role="none">
                    <div class="layout-menuitem-root-text" *ngIf="item.visible"  [attr.aria-label]="item.label">{{item.label}}</div>
                    <ul role="menu">
                        <li app-menuitem *ngFor="let child of item.items"  [item]="child" [index]="i" role="none"></li>
                    </ul>
                </li>
               
            </ul>
        </div>
    `
})
export class AppMenuComponent implements OnInit {

    model: any[];

    constructor(public appMain: AppMainComponent) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home', visible: true,
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', visible: checkIsItemVisible('Dashboard'), routerLink: ['/mainapp'] }
                ]
            },
            {
                label: 'User Management', visible: true,
                items: [
                    { label: 'Admin Management', icon: 'pi pi-fw pi-eye', visible: checkIsItemVisible('Admin Management'), routerLink: ['/mainapp/admin-management'] },
                    { label: 'Agent Management', icon: 'pi pi-fw pi-eye', visible: checkIsItemVisible('Agent Management'), routerLink: ['/mainapp/agent-management'] },
                    { label: 'Manager Management', icon: 'pi pi-fw pi-eye', visible: checkIsItemVisible('Manager Management'), routerLink: ['/mainapp/manager-management'] },
                    { label: 'Delivery Management', icon: 'pi pi-fw pi-eye', visible: checkIsItemVisible('Delivery Management'), routerLink: ['/mainapp/delivery-management'] }


                ]
            }
            ,
            {
                label: 'Stock Management', visible: checkIsItemVisible('Stock Management'),
                items: [
                    { label: 'Manage Stock', icon: 'pi pi-fw pi-eye', visible: checkIsItemVisible('Manage Stock'), routerLink: ['/mainapp/manager-stock'] },
                    { label: 'Manage Command', icon: 'pi pi-fw pi-eye', visible: checkIsItemVisible('Manage Command'), routerLink: ['/mainapp/manage-command'] },


                ]
            }


        ];
    }

    onKeydown(event: KeyboardEvent) {
        const nodeElement = (<HTMLDivElement>event.target);
        if (event.code === 'Enter' || event.code === 'Space') {
            nodeElement.click();
            event.preventDefault();
        }
    }
}
function checkIsItemVisible(menuType: string) {
    const applicationUserDTO: ApplicationUserDTO = JSON.parse(sessionStorage.getItem('connectedUser'));
    if (applicationUserDTO.superAdmin == true) {
        if ((menuType == 'Admin Management')) {
            return true;
        }
        else {
            return false;
        }
    }
    if (applicationUserDTO.userType.toString() == UserType[UserType.Admin]) {
        if ((menuType == 'Manager Management') ||(menuType == 'Manage Stock') || (menuType == 'Manage Command') || (menuType == 'Stock Management') || (menuType == 'Delivery Management')) {
            return true;
        }
        else {
            return false;

        }

    }
    if (applicationUserDTO.userType.toString() == UserType[UserType.Agent])  {
        if ((menuType == 'Request Stock')||(menuType=='Stock Management')|| (menuType == 'Manage Command') || (menuType == 'Dashboard')) {
            return true;
        }
        else {

            return false;
        }

    }
    if (applicationUserDTO.userType.toString() == UserType[UserType.Manager]) {
        if (menuType == 'Agent Management') {
            return true;
        } 
        else {
            return false;
        }
    } 
    if (applicationUserDTO.userType.toString()==  UserType[UserType.Delivery]) {
        if ((menuType == 'Manage Command')||(menuType=='Stock Management')) {
            return true;
        }
        else {
            return false;
        }
    }
    return false;
}

