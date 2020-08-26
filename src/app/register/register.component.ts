import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthenticationService } from 'src/app/services/authentication.service'
import { Router } from '@angular/router';
import AOS from 'aos';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
registerForm: FormGroup;
alertMessage;
alertBoolean: boolean;
  constructor(private formBuilder: FormBuilder, private authService: AuthenticationService, private route:Router) {
    this.registerForm = formBuilder.group({
      uid:['', Validators.required],
      uname:['', Validators.required],
      pass:['', Validators.required],
      date:['', Validators.required]
    })
   }

  ngOnInit(): void {
    AOS.init();
  }
  onSubmit(regData){
    this.authService.signUp(regData);
   this.registerForm.reset();
   this.alertMessage = "Register Successfully";
   this.alertBoolean = true;
   setTimeout(() => {
     this.alertBoolean = false;
   }, 2000);
  this.route.navigate(['login']);
  }

}
