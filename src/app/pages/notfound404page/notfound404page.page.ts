import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';

@Component({
  selector: 'app-notfound404page',
  templateUrl: './notfound404page.page.html',
  styleUrls: ['./notfound404page.page.scss'],
})
export class Notfound404pagePage implements OnInit {

  
  constructor(public router:Router, public session:GestionarSesionService) { }
  
  public redireccion(){
    if(this.session.getSession() == null){
      this.router.navigateByUrl("/login")
    }
    else{
      this.router.navigateByUrl("/mainpage")
    }
   
  }

  ngOnInit() {
  }

}
