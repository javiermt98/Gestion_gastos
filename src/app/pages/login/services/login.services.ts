import { Injectable } from '@angular/core';
import { Observable, Subject, Subscription } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { RegisterService } from '../../register/services/register.services';
import { iregister } from 'src/app/pojos/iregister';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  usrRegistrados: iregister[];
    //API_ENDPOINT = 'http://localhost:80/api/api.php';
    constructor(private http: HttpClient, private registerService: RegisterService) {
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
          console.log(login);
          rdo = true;
        }
      });

      return rdo;
    }  

}