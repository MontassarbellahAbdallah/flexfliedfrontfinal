import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Contact } from '../model/Contact.model';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent {
  messageCommande=""
  contactForm:FormGroup
  
  newContact=new Contact()
  constructor(private services : ServiceService , private router : Router, private fb:FormBuilder) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),

        email: new FormControl('',[
        Validators.required,
        Validators.email]),

        tel: new FormControl('',[
          Validators.required,]),
        
        sujet: new FormControl('',[
          Validators.required,]),
        
        msg: new FormControl('',[
            Validators.required,])
      }
     this.contactForm = this.fb.group(formControls)
   }
   get nom() {return this.contactForm.get('nom');} 
   get email() {return this.contactForm.get('email');} 
  get tel() { return this.contactForm.get('tel');}
  get sujet() {return this.contactForm.get('sujet');}
  get msg() {return this.contactForm.get('msg');} 
  
   addNewContact() {
    let data = this.contactForm.value;
    console.log(data);
    let contact = new Contact(
     undefined, data.nom,data.email,data.tel,data.sujet,data.msg);
    console.log(contact);
    
    if (
      data.nom == 0 ||
      data.email == 0 ||
      data.tel == 0||
      data.sujet == 0 ||
      data.msg == 0
    ) {
      this.messageCommande=`<div class="alert alert-danger" role="alert">
      remplir votre champ 
    </div>`
    
    } else {
    this.services.addcontact(contact).subscribe(
      res=>{
        console.log(res);
        this.messageCommande=`<div class="alert alert-success" role="alert">
        avec success
      </div>`
        
        this.router.navigate(['/contact'])
        window.location.reload()
        ;
      },
       err=>{
        this.messageCommande=`<div class="alert alert-warning" role="alert">
        EMAIL EXISTE deja!!!! 
      </div>`
  
      })
      setTimeout(() => {
        this.messageCommande=""
      }, 30000);
    
    }
  }

}
