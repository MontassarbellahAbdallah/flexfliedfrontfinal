import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Terrain } from '../model/Terrain.model';
import { ServiceService } from '../Service/service.service';

@Component({
  selector: 'app-terrains',
  templateUrl: './terrains.component.html',
  styleUrls: ['./terrains.component.css']
})
export class TerrainsComponent {
  totalTerrains:number=0
  totalTerrains1:Terrain[]
  terrains:Terrain={}
  isLogedIn:boolean;
  constructor(private service:ServiceService, private router:Router ,private activatedRoute:ActivatedRoute){

  }

  ngOnInit():void{
    this.isLogedIn=this.service.isLogedIn();
    this.service.getTerrain().subscribe(terrain=>{this.totalTerrains=terrain.length})
    this.service.getTerrain().subscribe(terrain=>{this.totalTerrains1=terrain})
  }
  getTerrain(){
    let id =this.activatedRoute.snapshot.params['id']
    this.service.getTerrainById(id).subscribe(terrain=>{
      this.terrains=terrain
    })
    
  }

}
