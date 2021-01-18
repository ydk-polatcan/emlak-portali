import { FbservisService } from '../../services/fbservis.service';
import { Sonuc } from '../../models/sonuc';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { partitionArray } from '@angular/compiler/src/util';

@Component({
  selector: 'app-user-login',
  templateUrl: './userlogin.component.html',
  styleUrls: ['./userlogin.component.css']
})
export class UserLoginComponent implements OnInit {
  sonuc: Sonuc = new Sonuc();
  constructor(
    public fbServis: FbservisService,
    public router: Router
  ) { }

  ngOnInit() {
  }
  GirisYap(mail: string, parola: string) {
    this.fbServis.OturumAc(mail, parola).then(d => {
      localStorage.setItem("user", JSON.stringify(d.user));
      this.router.navigate(['/']);
    }, err => {
      this.sonuc.islem = false;
      this.sonuc.mesaj = "E-Posta Adresi veya Parola Geçersizdir!";
    });
  }
}
