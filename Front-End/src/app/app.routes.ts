import { Routes } from '@angular/router';
import { CadastroComponent } from './paginas/cadastro/cadastro.component';
import { LoginComponent } from './paginas/login/login.component';
import { RecSenhaComponent } from './paginas/rec-senha/rec-senha.component';
import { HomeComponent } from './paginas/home/home.component';
import { CheckoutComponent } from './paginas/checkout/checkout.component';
import { ProdutosComponent } from './paginas/produtos/produtos.component';
import { AdicionarProdutoComponent } from './paginas/adicionar-produto/adicionar-produto.component';
import { DetalhesPedidoComponent } from './paginas/detalhes-pedido/detalhes-pedido.component';
import { UsuarioPerfilComponent } from "./paginas/usuario-perfil/usuario-perfil.component";
import { VendedorPerfilComponent } from "./paginas/vendedor-perfil/vendedor-perfil.component";

export const routes: Routes = [
    { path: '', component: HomeComponent },
    { path: 'cadastro', component: CadastroComponent },
    { path: 'login', component: LoginComponent },
    { path: 'recuperar-senha', component: RecSenhaComponent },
    { path: 'produtos', component: ProdutosComponent },
    { path: 'adicionar-produto', component: AdicionarProdutoComponent },
    { path: 'checkout', component: CheckoutComponent },
    { path: 'detalhes-pedido/:id', component: DetalhesPedidoComponent },
    { path: 'perfil/usuario', component: UsuarioPerfilComponent },
    { path: 'perfil/vendedor', component: VendedorPerfilComponent },
    { path: '**', redirectTo: '' }
];
