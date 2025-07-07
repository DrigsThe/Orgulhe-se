import { Component } from '@angular/core';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { RouterLink } from '@angular/router';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-cadastro',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  constructor(private readonly http: HttpClient) {}

  onLogin(): void {
    console.log('Login clicado');
  }

  submit(): void {
    //rota post
    const body = {"login": "oiwufgyhrbe", "password": "ruwkgyb"}

    this.http.post('http://localhost:3001/login', body, {
      headers: new HttpHeaders({ 'Accept': 'application/json' }),
      withCredentials: false
    }).subscribe({
      next: (res) => {
        // sua lógica
      },
      error: (err) => {
        //sua lógica
      }
    });


    //rota get
    this.http.get('http://localhost:3001/login', {
      headers: new HttpHeaders({ 'Accept': 'application/json' }),
      withCredentials: false
    }).subscribe({
      next: (res) => {
        // sua lógica
      },
      error: (err) => {
        //sua lógica
      }
    });
  }

}
