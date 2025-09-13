import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth-service';
import { type loginDTO, type loginResponseDTO } from '../authentication-model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  imports: [FormsModule],
  templateUrl: './register.html',
  styleUrl: './register.css'
})
export class Register {
  private authService = inject(AuthService)
  private router = inject(Router)

  error: boolean = false;
  registerBody: loginDTO = {
    email: '',
    password: ''
  }

  login() {
    
   const subscription =  this.authService.login(this.registerBody).subscribe(
      {
        next: (token) => {
          localStorage.setItem("account", JSON.stringify({email: this.registerBody.email, password: this.registerBody.password, accessToken: token.accessToken}))
        },
        error: () => {
          this.error = true;
        },
        complete: () => {
          subscription.unsubscribe(),
          this.router.navigate(["tasks"])
        }
      }
    )
  }

  onRegister() {
  const subscription = this.authService.register(this.registerBody).subscribe(
    {
      complete: () => {
        subscription.unsubscribe();
        this.login()
      }

    }
   )
  }

}
