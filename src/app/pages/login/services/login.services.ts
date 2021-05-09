import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../../register/services/register.services';
import { iregister } from 'src/app/pojos/iregister';
import { Isession } from 'src/app/pojos/isession';
import { GestionarSesionService } from 'src/app/shared/gestionar-sesion.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usrRegistrados: iregister[];
    //API_ENDPOINT = 'http://localhost:80/api/api.php';
    constructor(private http: HttpClient, private registerService: RegisterService, private session:GestionarSesionService) {
      this.registerService.getRegistros().subscribe({
        next: registros =>{
          this.usrRegistrados = registros;
        }
      });

    }


    

    Testlogin(username:string, password:string) {
     let rdo = false;
      this.usrRegistrados.forEach(login => {
        if(username == login.correo_log && password == login.pwd_log){
          let token="valido";
            let u: Isession = {username: username, id_login: login.id_login, token: token};        
            this.session.setSession(u);
          rdo = true;
        }
      });

      return rdo;
    }  

}