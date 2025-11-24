export interface DadosFinais {
    contato: string;
  endereco: {
    logradouro: string;
    numero: string;
    cep: string;
    cidade: string;
    estado: string;
  };
  pagamento: string;
  entrega: string;
  subtotal: number;
  total: number;
  cupom: string;
  desconto: number;
  frete: number;
}
