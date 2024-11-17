import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Contact } from '../model/Contact.model';
import { Observable } from 'rxjs';
import { Terrain } from '../model/Terrain.model';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Client } from '../model/Client.model';
import { Router } from '@angular/router';
import jwt_decode from 'jwt-decode';

@Injectable({
  providedIn: 'root'
})
export class ServiceService {
  isConnected=false;
  apiURL="http://localhost:8081/api"
  helper=new JwtHelperService();
  loginClientURL="http://localhost:8081/api/Client/loginc"
  constructor(private http:HttpClient, private router:Router) {}

  loginclientfromapi(client:Client){
    return this.http.post<any>(this.loginClientURL, client);
  }
  
  loginclient(client:Client){
    this.loginclientfromapi(client).subscribe((data)=>{
      console.log(data)
      var decoded:any=jwt_decode(data.token);
      console.log(decoded);
      this.loginCl(decoded.data)
    })
  }
  loginCl(data:any){
    localStorage.setItem("idClient",data.id)
    this.isConnected=true
    this.router.navigate(['/'])
  }

  // affichage selon client id
  getAllReservationbyClientId(){
    return this.http.get<any>( "http://localhost:8081/api/Reserver/get-all-by-id-client/"+localStorage.getItem("idClient"));
  }
//reserver
reserverFromApi(rq:any){
  return this.http.post<any>( "http://localhost:8081/api/Reserver" ,rq );
}
  addclient(client: Client) {
    return this.http.post<any>(this.apiURL+"/Client",client)
  }
  
  addcontact(contact:Contact){
    return this.http.post<any>(this.apiURL+"/Contact",contact)
  }

  getTerrain():Observable<Terrain[]>{
    return this.http.get<Terrain[]>(this.apiURL+"/Terrain")
  }
  isLogedIn(){
    let token1=localStorage.getItem("idClient")
    if(token1){
      return true;
    }
    else{
      return false;
    }
  }
  getTerrainById(id:number):Observable<Terrain> {
    const url=`${this.apiURL+"/Terrain"}/${id}`;
    return this.http.get<Terrain>(url)
  }
  suppResrv(id: number) {
    const url=`${this.apiURL+"/Reserver"}/${id}`
    return this.http.delete(url)
  }
  

  
}
