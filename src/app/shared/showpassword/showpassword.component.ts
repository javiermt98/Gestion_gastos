import { Component, ContentChild, OnInit } from '@angular/core';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-showpassword',
  templateUrl: './showpassword.component.html',
  styleUrls: ['./showpassword.component.scss'],
})
export class ShowpasswordComponent implements OnInit {
  showPassword = false;
  @ContentChild(IonInput) input: IonInput;
  constructor() { }

  ngOnInit() {}

  mostrarPassword() {
    this.showPassword = !this.showPassword;
    this.input.type = this.showPassword ? 'text' : 'password';
  }

}
