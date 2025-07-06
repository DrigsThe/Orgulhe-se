import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-adicionar-produto',
  standalone: true,
  imports: [ FormsModule, CommonModule],
  templateUrl: './adicionar-produto.component.html',
  styleUrls: ['./adicionar-produto.component.css']
})
export class AdicionarProdutoComponent {
  imagens: string[] = [];
  imagemSelecionada: number = 0;

  nomeProduto: string = '';
  codigoProduto: string = '';
  precoProduto: number | null = null;
  descricaoProduto: string = '';

  cores: { nome: string, valor: string }[] = [];
  tamanhos: string[] = [];

  sobreTitulo: string = 'Sobre o Produto';
  sobreTexto: string = '';

  tecnologiaTitulo: string = 'Tecnologias do produto';
  tecnologiaTexto: string = '';

  avaliacaoNota: number = 0;
  avaliacaoEstrelas: string = '';
  avaliacaoQtd: number = 0;

  adicionarImagemDireta(event: any, pos: number) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.imagens.push(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  }

  removerImagem(idx: number) {
    this.imagens.splice(idx, 1);
    if (this.imagemSelecionada >= this.imagens.length) {
      this.imagemSelecionada = 0;
    }
  }

  adicionarCor() {
    this.cores.push({ nome: '', valor: '#000000' });
  }

  removerCor(idx: number) {
    this.cores.splice(idx, 1);
  }

  adicionarTamanho() {
    this.tamanhos.push('');
  }

  removerTamanho(idx: number) {
    this.tamanhos.splice(idx, 1);
  }

  salvarProduto() {
    // Lógica para salvar o produto
    alert('Produto salvo (simulação)');
  }

  salvarAvaliacao() {
    // Lógica para salvar avaliação
    alert('Avaliação salva (simulação)');
  }
}