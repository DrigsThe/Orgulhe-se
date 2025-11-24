import { Component } from '@angular/core';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-rec-senha',
  standalone: true,
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './rec-senha.component.html',
  styleUrl: './rec-senha.component.css'
})
export class RecSenhaComponent {

  onRecSenha(): void{
    console.log('Recuperar senha clicado');
  }

}
