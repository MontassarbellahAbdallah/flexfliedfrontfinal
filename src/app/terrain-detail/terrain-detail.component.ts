import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Terrain } from '../model/Terrain.model';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-terrain-detail',
  templateUrl: './terrain-detail.component.html',
  styleUrls: ['./terrain-detail.component.css']
})
export class TerrainDetailComponent {
  tataldetails:any;
  terrains:Terrain={}
  isLogedIn:boolean;
  messageCommande=""
  //totalTerrains2:Terrain[]
  constructor(private service:ServiceService, private router:Router,private activatedRoute:ActivatedRoute){
    
  }

  ngOnInit():void{
    this.getTerrain();
    this.isLogedIn=this.service.isLogedIn();
    //this.service.getTerrain().subscribe(terrain=>{this.totalTerrains2=terrain})
 
  }
  getTerrain(){
    let id =this.activatedRoute.snapshot.params['id']
    this.service.getTerrainById(id).subscribe(terrain=>{
      this.terrains=terrain
    })
    
  }

  reserver(event:any)
  {
    this.messageCommande=`<div class="alert alert-primary" role="alert">
    Veuillez patienter ...
  </div>`
    console.log(event)
    let rq:any={}
    rq.idClient=Number(localStorage.getItem("idClient")) 
    rq.idTerrain=event.id
   
    console.log(rq,"what we senddddd")
    this.service.reserverFromApi(rq).subscribe((data:any)=>{
      this.router.navigate(['mes-reservations'])
    
      this.messageCommande=`<div class="alert alert-success" role="alert">
    Réservé avec succès
  </div>`
    }, err=>{
      this.messageCommande=`<div class="alert alert-warning" role="alert">
     Erreur, Veuillez réssayer !! 
    </div>`

    })
    setTimeout(() => {
      this.messageCommande=""
    }, 3000);
  }

    connexion()
    {
      this.router.navigate(['/login'])
    }

}
