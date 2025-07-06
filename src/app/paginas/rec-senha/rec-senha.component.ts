import { Component } from '@angular/core';

@Component({
  selector: 'app-rec-senha',
  standalone: true,
  imports: [],
  templateUrl: './rec-senha.component.html',
  styleUrl: './rec-senha.component.css'
})
export class RecSenhaComponent {

  onRecSenha(): void{
    console.log('Recuperar senha clicado');
  }

}
