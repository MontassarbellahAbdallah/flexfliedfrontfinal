import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  userdetails:any;
  isLogedIn:boolean;
  
  constructor(private service:ServiceService, private router:Router){
    
  }

  logout(){
    localStorage.clear()
    this.router.navigate(['/'])
    window.location.reload()
  }
  ngOnInit():void{
    this.isLogedIn=this.service.isLogedIn();
  }

}
