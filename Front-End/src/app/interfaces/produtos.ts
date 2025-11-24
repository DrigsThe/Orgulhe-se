export interface Produtos {
    nome: string;
    preco: number; // Preço final do item (com desconto, se houver)
    quantidade: number;
    imagemUrl: string;
    variant?: string;
    originalPrice?: number;
    discountInfo?: string;
    isFree?: boolean;
}
