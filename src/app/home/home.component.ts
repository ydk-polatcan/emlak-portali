import { Category } from './../interfaces/category';
import { CategoryService } from './../services/category.service';

import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnDestroy, OnInit } from '@angular/core';
import  firebase from 'firebase';
import { Subscription } from 'rxjs';
import { PropertiesService } from '../services/properties.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit, OnDestroy{

  properties: any[] = [];
  filteredProperties: any[] = [];
  categories$;
  category = '';
  propertiesSubscription!: Subscription;
  isLoggedIn = false;
  constructor(
    private route : ActivatedRoute,
    private categoryService : CategoryService,
    private propertiesService: PropertiesService,

  ) {
    this.categories$ = this.categoryService.getCategories();
    this.route.queryParamMap.subscribe(params =>{
      this.category = params.get('category');
      this.filteredProperties = (this.category) ? 
      this.properties.filter( p => p.payload.val().category === this.category) : this.properties 
      
    })
   }

  ngOnInit() {

    firebase.auth().onAuthStateChanged(
      (userSession) => {
        if (userSession){
          this.isLoggedIn = true;
        }else{
          this.isLoggedIn = false;
        }
      }
    );
    this.propertiesSubscription = this.propertiesService.propertiesSubject.subscribe(
      (data: any) => {
        this.properties = data;
      }
    );
    this.propertiesService.getProperties();

   
  }

  getSoldValue = (sold) => {
    if (sold){
      return 'orange';
    }else{
      return 'green';
    }
  }

  ngOnDestroy(){
    this.propertiesSubscription.unsubscribe();
  }
}
