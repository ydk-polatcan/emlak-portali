import { Component } from '@angular/core';
import firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  title = 'ImmoBab';

  constructor(){
    const firebaseConfig = {
      apiKey: "AIzaSyC0Y9cYVlHllOsp-R8OpQ1NIlqBXFbzaug",
      authDomain: "emlakportali-7ac99.firebaseapp.com",
      databaseURL: "https://emlakportali-7ac99-default-rtdb.firebaseio.com",
      projectId: "emlakportali-7ac99",
      storageBucket: "emlakportali-7ac99.appspot.com",
      messagingSenderId: "323450399115",
      appId: "1:323450399115:web:1d30b21c5a1ef5e863278e",
      measurementId: "G-LE86T257TD"
    };

    firebase.initializeApp(firebaseConfig);
  }

}
