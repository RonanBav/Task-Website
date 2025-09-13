import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { type loginDTO, type loginResponseDTO, type account } from '../authentication-model';
import { AuthService } from '../auth-service';
import { FormsModule } from '@angular/forms';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [FormsModule, RouterLink],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login implements OnInit {

  private router = inject(Router)
  private loginService = inject(AuthService)

  error: string = "";

  loginBody: loginDTO = {
    email: "",
    password: ""
  }

  account!: account

  ngOnInit(): void {
  }




  onLogin() {
    const subscription = this.loginService.login(this.loginBody).subscribe(
      {
        next: (token: loginResponseDTO) => {
          if (token) {
            this.account = {
              email: this.loginBody.email, 
              password: this.loginBody.password,
              accessToken: token.accessToken
            }
            localStorage.setItem('account', JSON.stringify(this.account))
          }
          this.error = "";
        },
        error: (error) => {
          this.error = "Incorrect email or password"
          
        }
        ,
        complete: () => {
          subscription.unsubscribe();
          if (this.account) {
            this.router.navigate(["tasks"])
          }
        }
      }
    )
  }


}
