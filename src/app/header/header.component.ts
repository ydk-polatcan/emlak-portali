import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import firebase from 'firebase';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  title = 'Emlak Ajansı';

  isLoggedIn = false;

  constructor(
    private authentifacationService: AuthenticationService,
  ) { }

  ngOnInit(): void {
    firebase.auth().onAuthStateChanged(
      (userSession) => {
        if (userSession){
          this.isLoggedIn = true;
        }else{
          this.isLoggedIn = false;
        }
      }
    );
  }

  onLogoutUser(){
    this.authentifacationService.logoutUser();
  }
  
  adminKontrol() {
    if (localStorage.getItem("user")) {
      return true;
    } else {
      return false;
    }
  }
}
