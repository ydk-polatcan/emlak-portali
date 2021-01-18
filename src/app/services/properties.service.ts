import { Category } from './../interfaces/category';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Property } from '../interfaces/property';
import firebase from 'firebase';
import { SnapshotAction, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class PropertiesService {
  properties$
  properties: Property[] = [];
  categories: Category[] = [];
  propertiesSubject = new Subject<Property[]>();

  constructor(private db : AngularFireDatabase) { }

  emitProperties() {
    this.propertiesSubject.next(this.properties);
  }

  saveProperties(){
    firebase.database().ref('/properties').set(this.properties);
  }

  getProperties(){
    firebase.database().ref('/properties').on('value', (data) => {
      this.properties = data.val() ? data.val() : [];
      this.emitProperties();
    });
  }
  getCategories(category: string){
    firebase.database().ref('/properties').orderByChild("category").equalTo(category).on("value", (data) => {
      this.categories = data.val() ? data.val() : [];
    });
  }

  getSinglePropertie(id){
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/properties/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }
        ).catch(
          (error) => {
            console.error(error);
            reject(error);
          },
        );
      }
    );
  }

  createProperty(property: Property) {
    this.properties.push(property);
    this.saveProperties();
    this.emitProperties();
  }

  deleteProperty(index){
     this.properties.splice(index, 1);
     this.saveProperties();
     this.emitProperties();
  }

  updateProperty(property: Property, index){
     firebase.database().ref('/properties/' + index).update(property).catch(
       (error) => {
         console.error(error);
       }
     );
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const uniqId = Date.now().toString();
        const fileName = uniqId + file.name;
        const upload = firebase.storage().ref().child('/images/properties/' + fileName).put(file);
        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('chargement ...');
          },
          (error) => {
            console.error(error);
            reject(error);
          },
          () => {
            upload.snapshot.ref.getDownloadURL().then(
              (downLoadUrl) => {
                resolve(downLoadUrl);
              }
            );
          }
          );
      }
    );
  }

  removeFile(filelink: string){
    if (filelink) {
      const storageRef = firebase.storage().refFromURL(filelink);
      storageRef.delete().then(
        () => {
          console.log('file deleted');
        }
      ).catch(
        (error) => {
          console.error(error);
        }
      );
    }

  }

}
