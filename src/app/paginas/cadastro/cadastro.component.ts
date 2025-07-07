import { Component } from '@angular/core';
import { HeaderComponent } from '../../componentes/header/header.component';
import { FooterComponent } from '../../componentes/footer/footer.component';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  imports: [HeaderComponent, FooterComponent, RouterLink],
  templateUrl: './cadastro.component.html',
  styleUrl: './cadastro.component.css'
})
export class CadastroComponent {

  onLogin(): void {
    console.log('Login clicado');
  }

}
