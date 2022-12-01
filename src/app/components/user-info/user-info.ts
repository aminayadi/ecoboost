import { Component, OnInit, ViewChild } from '@angular/core';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { MenuItem } from 'primeng/api';
import { FileUpload } from 'primeng/fileupload';
import { Subscription } from 'rxjs';
import { AppHelper } from 'src/app/AppHelper';
import { ApplicationUserDTO } from 'src/app/model/ApplicationUserDTO';
import { UserType } from 'src/app/model/UserType';


@Component({
    selector: 'user-info',
    templateUrl: './user-info.html',
    styleUrls: ["./user-info.scss"]
})
export class UserInfoComponent implements OnInit {
    image: string | SafeUrl =
        "assets/layout/images/avatar.png";
    public userInfo: String; 
    public userName: String;
    public userCode: String;
    constructor(private sanitizer: DomSanitizer) { }

    ngOnInit() {
        let applicationUser: ApplicationUserDTO = AppHelper.getConnectedUser();
        this.userInfo =  applicationUser.userType.toString();
        this.userName=applicationUser.firstName;
        this.userCode=applicationUser.code;

    }
    updateImage(ev) {
        this.image = this.sanitizer.bypassSecurityTrustUrl(
            window.URL.createObjectURL(ev.target.files[0])
        );
    }
    uploadPhoto() {

        console.log("ddd");


    }

}
