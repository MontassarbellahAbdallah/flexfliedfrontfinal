import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Client } from '../model/Client.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  messageCommande=""
  clientForm:FormGroup
  
  newClient=new Client()
  constructor(private services : ServiceService , private router : Router, private fb:FormBuilder) {
    let formControls = {

        email: new FormControl('',[
        Validators.required,
        Validators.email]),

        mdp: new FormControl('',[
          Validators.required,])
      }
     this.clientForm = this.fb.group(formControls)
   }
   get email() {return this.clientForm.get('email');} 
  get mdp() { return this.clientForm.get('mdp');}
  
  
   loginClient() {
    let data = this.clientForm.value;
    console.log(data);
    let client = new Client(
     null,null,null,data.email,data.mdp,null,null,null);
    console.log(client);
    
    if (
      data.email == 0 ||
      data.mdp == 0
    ) {
      this.messageCommande=`<div class="alert alert-danger" role="alert">
      remplir votre champ 
    </div>`
    
    } else {
    this.services.loginclient(client);
      this.messageCommande=`<div class="alert alert-success" role="alert">
      bienvenu
    </div>`
    }
  }

}
