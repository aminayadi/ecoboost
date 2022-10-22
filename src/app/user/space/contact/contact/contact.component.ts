import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroupDirective, Validators } from '@angular/forms';
import { SubSink } from 'subsink';
import { environment } from 'src/environments/environment';
import { ContactusService } from 'src/app/Components/contact/service/contactus.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss'],
})
export class ContactComponent implements OnInit,OnDestroy {


  contactForm = this.fb.group({
    fullName:[''],
    email: ['',Validators.email],
    objectContact:[''],
    content: [''],
    recaptcha: ['',Validators.required]
   });
// for form contactus
  displaySpinnrt= false;
  activSend= false;
  activationBoolean= true;
  sendValid= false;
  sendInValid= false;
  cursor='pointer';
  errormessage='';
// for Angular lifeCycle hook => onDestroy
  private subs = new SubSink();

  constructor( private fb: FormBuilder, private contactServ: ContactusService) {}

ngOnInit(): void { console.log("init compoenent");}

handleSuccess(data: any) {
  console.log("data =",data);
}

sendMessage(formDirective: FormGroupDirective): void {

 if(this.contactForm.valid) {

  this.displaySpinnrt= true;
  this.cursor= 'wait';
 // this.contactForm.removeControl('recaptcha'); // to remove captcha field  recaptcha: but generate error, why ??
  this.contactForm.patchValue({recaptcha:''}); //   captcha field  without value, wor(k !!)

  this.subs.sink= this.contactServ.sendMessage(this.contactForm.value).subscribe({

    next:()=>{ this.initFormControl(formDirective); },

    error:err=>{  this.sendInValid= true;
                  this.errormessage= err.message;
                  this.cursor= 'pointer';

                  setTimeout(()=> {this.sendInValid= false; },7000)
                },
    complete:()=> { this. sendValid= true;
                    this.displaySpinnrt= false;
                    this.cursor= 'pointer';
                    setTimeout(()=> {this.sendValid= false;},3500)
                  }
    });
 }
}

initFormControl(formDirective: FormGroupDirective): void {
    formDirective.resetForm();
  }

ngOnDestroy(): void { this.subs.unsubscribe();}

}
