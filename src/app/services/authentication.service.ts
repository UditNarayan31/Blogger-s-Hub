import { Injectable } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {AngularFireAuth} from 'angularfire2/auth'
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
regiterData;

  constructor(public firebase:AngularFireDatabase, public af: AngularFireAuth) {
    this.regiterData = firebase.list("registerData");
 }
 signUp(regData){
  return this.regiterData.push(regData)
 }

 signIn(){
   return this.regiterData;
 }

 }
