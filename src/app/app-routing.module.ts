import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TerrainsComponent } from './terrains/terrains.component';
import { TerrainDetailComponent } from './terrain-detail/terrain-detail.component';
import { MesReservationsComponent } from './mes-reservations/mes-reservations.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path:'',component: HomeComponent},
  {path:'terrains',component: TerrainsComponent},
  {path:'terraindetail/:id',component: TerrainDetailComponent},
  {path:'res',component: MesReservationsComponent},
  {path:'login',component: LoginComponent},
  {path:'contact',component: ContactComponent},
  {path:'about',component: AboutComponent},
  {path:'register',component: RegisterComponent},

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
