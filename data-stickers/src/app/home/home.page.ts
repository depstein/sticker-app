import { Component } from '@angular/core';
import { Storage } from '@ionic/storage';
import { StylesCompileDependency } from '@angular/compiler';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})

export class HomePage {
  userId: string; 
  idEntered: boolean;
  idInput: string;
  onHomeScreen: boolean;

  constructor(private storage: Storage) {
    this.idEntered = false;
    this.onHomeScreen = true;
    this.userId = '';
    this.checkForUserId();
  }

  checkForUserId(){
    this.storage.get('id')
    .then((value) => {
      if (value != null){
        this.userId = value;
        this.idEntered = true; 
      }
    })
  }

  setUserId(idInput){
    this.storage.set('id', idInput);
    this.userId = idInput;
    this.idEntered = true; 
  }

  clearUserId(){
    this.storage.remove('id');
    this.userId = '';
    this.idEntered = false;
  }

  removeButton(){
    document.getElementById('clearButton').style.setProperty('z-index', 'auto');
  }

}
