import { Component } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Client } from '../model/Client.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  messageCommande=""
  clientForm:FormGroup
  
  newClient=new Client()
  constructor(private services : ServiceService , private router : Router, private fb:FormBuilder) {
    let formControls = {
      nom: new FormControl('',[
        Validators.required,]),
    
        prenom: new FormControl('',[
        Validators.required,]),

        email: new FormControl('',[
        Validators.required,
        Validators.email]),
        
        mdp: new FormControl('',[
          Validators.required,]),
        
        num: new FormControl('',[
          Validators.required,]),
        
        adresse: new FormControl('',[
          Validators.required,])
      }
     this.clientForm = this.fb.group(formControls)
   }
   get nom() {return this.clientForm.get('nom');} 
   get prenom() {return this.clientForm.get('prenom');} 
   get email() { return this.clientForm.get('email');}
   get mdp() {return this.clientForm.get('mdp');}
   get num() {return this.clientForm.get('num');} 
   get adresse() {return this.clientForm.get('adresse');} 
  
   addNewClient() {
    let data = this.clientForm.value;
    console.log(data);
    let client = new Client(
     undefined, data.nom,data.prenom,data.email,data.mdp,data.num,data.adresse);
    console.log(client);
    
    if (
      data.nom == 0 ||
      data.prenom == 0 ||
      data.email == 0||
      data.mdp == 0 ||
      data.num == 0 ||
      data.adresse == 0
      
    ) {
      this.messageCommande=`<div class="alert alert-danger" role="alert">
      remplir votre champ 
    </div>`
    
    } else {
    this.services.addclient(client).subscribe(
      res=>{
        console.log(res);
        this.messageCommande=`<div class="alert alert-success" role="alert">
        avec success
      </div>`
        
        this.router.navigate([''])
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
