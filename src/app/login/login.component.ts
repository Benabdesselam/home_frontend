import {Component, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../services/auth.service";
import {TokenService} from "../services/token.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit{
  loginForm=new FormGroup({
      email:new FormControl(null,[Validators.required, Validators.pattern(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)]),
      password:new FormControl(null,[Validators.required,Validators.minLength(4),Validators.max(8)])
    })
  constructor(private authService:AuthService,private tokenService:TokenService,private router:Router) {
  }
  ngOnInit(): void {
  }
login(){
    const email = this.loginForm.value.email ?? '';
    const password = this.loginForm.value.password ?? ''

    this.authService.login({email,password }).subscribe(
      res=> this.handleResponse(res),
      error => {
        alert("username or password incorrect !")
      }

    );


}
  handleResponse(res:any){
    this.tokenService.handle(res);
    this.router.navigateByUrl("/home");
  }
}
