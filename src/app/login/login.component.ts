import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { auth } from 'firebase';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import AOS from 'aos';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
getLogin;
uname;
pass;
loginForm:FormGroup;
alertMsg;
alertBool;
  constructor(private authService:AuthenticationService, private loginBuilder: FormBuilder, private route: Router) {
    this.loginForm = this.loginBuilder.group({
      uname:[''],
      pass:['']
    })
   }

  ngOnInit(): void {
    AOS.init();
    this.authService.signIn().snapshotChanges().forEach(dataSnap => {
      this.getLogin = [];
      dataSnap.forEach(loginSnap => {
       let order = loginSnap.payload.toJSON();
       order['$key'] = loginSnap.key;
       this.getLogin.push(order)
       }); 
     });
    
}

  onLogin(loginValue){
    this.getLogin.forEach(item => {
      this.uname = item.unam;
      this.pass = item.pass;
});

    if(this.uname == loginValue.uname, this.pass == loginValue.pass){
       this.route.navigate(['profile']); 
    }else{
      this.alertMsg = "invalid details";
      this.alertBool = true;
     setTimeout(() => {
       this.alertBool = false;
     }, 2000);  
    }

  }

}
