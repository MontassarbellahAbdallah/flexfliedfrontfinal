import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ServiceService } from '../Service/service.service';
import { Terrain } from '../model/Terrain.model';
import { Reserver } from '../model/Reserver.model';

@Component({
  selector: 'app-mes-reservations',
  templateUrl: './mes-reservations.component.html',
  styleUrls: ['./mes-reservations.component.css']
})
export class MesReservationsComponent {
  listReservation:any=[]
  constructor(private service:ServiceService , private router : Router) { }
  
  ngOnInit(): void {
    this.service.getAllReservationbyClientId().subscribe((data:any)=>{
      console.log(data)
      this.listReservation=data;
    })
  }
  deleteResrv(resrv:Reserver){
    if(confirm("voulez vous supprimer cette reservation ???")){
      this.service.suppResrv(resrv.id).subscribe(()=>{
        this.router.navigate(["/res"]).then(()=>{
          window.location.reload()
        })
      })
    }
  }

}
