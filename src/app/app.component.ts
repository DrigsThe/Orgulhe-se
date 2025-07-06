import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { LoginComponent } from './paginas/login/login.component';
import { RecSenhaComponent } from './paginas/rec-senha/rec-senha.component';
import { HeaderComponent } from './componentes/header/header.component';
import { FooterComponent } from './componentes/footer/footer.component';
import { HomeComponent } from './paginas/home/home.component';
import { CheckoutComponent } from './paginas/checkout/checkout.component';
import { ProdutosComponent } from './paginas/produtos/produtos.component';
import { AdicionarProdutoComponent } from './paginas/adicionar-produto/adicionar-produto.component';
import { DetalhesPedidoComponent } from './paginas/detalhes-pedido/detalhes-pedido.component';
import { UsuarioPerfilComponent } from "./paginas/usuario-perfil/usuario-perfil.component";
import { VendedorPerfilComponent } from "./paginas/vendedor-perfil/vendedor-perfil.component";




@Component({
  selector: 'app-root',
  imports: [
    RouterOutlet,
    CadastroComponent,
    LoginComponent,
    RecSenhaComponent,
    HeaderComponent,
    FooterComponent,
    HomeComponent,
    CheckoutComponent,
    DetalhesPedidoComponent,
    ProdutosComponent,
    AdicionarProdutoComponent,
    UsuarioPerfilComponent,
    VendedorPerfilComponent
],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'OrgulheSe';
}
