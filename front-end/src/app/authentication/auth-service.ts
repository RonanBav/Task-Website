import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { type loginDTO, type loginResponseDTO } from './authentication-model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private httpClient = inject(HttpClient)

  protected baseUrl: string = "https://localhost:7070"

  login(loginBody: loginDTO) {
    return this.httpClient.post<loginResponseDTO>(`${this.baseUrl}/login`, loginBody)
  }

  register(registerBody: loginDTO) {
    
      return this.httpClient.post<loginResponseDTO>(`${this.baseUrl}/register`, registerBody)
  }
  
}
