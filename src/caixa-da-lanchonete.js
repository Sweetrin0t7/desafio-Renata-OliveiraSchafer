class CaixaDaLanchonete {

    //------------------------------------------------------------------------------------------------------------
        constructor() { //são informações fixas então não passa nenhuma instancia nos ()
            this.cardapio = [ //array de objetos
                { codigo: 'cafe',      descricao: 'Café',                        valor: 3.00 },
                { codigo: 'chantily',  descricao: 'Chantily (extra do Café)',    valor: 1.50, extra: 'cafe' },
                { codigo: 'suco',      descricao: 'Suco Natural',                valor: 6.20 },
                { codigo: 'sanduiche', descricao: 'Sanduíche',                   valor: 6.50 },
                { codigo: 'queijo',    descricao: 'Queijo (extra do Sanduíche)', valor: 2.00, extra: 'sanduiche' },
                { codigo: 'salgado',   descricao: 'Salgado',                     valor: 7.25 },
                { codigo: 'combo1',    descricao: '1 Suco e 1 Sanduíche',        valor: 9.50 },
                { codigo: 'combo2',    descricao: '1 Café e 1 Sanduíche',        valor: 7.50 }
            ];
    
            this.descontosAcrecimos = {
                dinheiro: 0.95,   // Pagamento - dinheiro tem 5% de desconto
                debito: 1,        // Pagamento - débito não possui alterações no valor
                credito: 1.03     // Pagamento - crédito tem acréscimo de 3% no valor
            };
        }
    
        //------------------------------------------------------------------------------------------------------------
            calcularValorDaCompra(formaDePagamento, itens) { //recebe os dados dos testes
                
                if (itens.length === 0) { //Se o tamanho for = 0
                    return "Não há itens no carrinho de compra!";
                }
    
                if (!this.descontosAcrecimos[formaDePagamento]) { //Se a propriedade formaDePagamento que vem lá dos testes 
                    return "Forma de pagamento inválida!";        //naõ existir dentro dos descontosAcrecimos (debito, credito, dinheiro)
                }
    
                // Inicializa o valor total da compra
                let total = 0; //usei let ao inves de cont pq o valor vai ser alterado
    
                //--------------------------------------------------------------------
                    const itensNoPedido = new Set();
                    //percorre cada elemento itemInfo no array de itens
                    for (const itemInfo of itens) {
                        //Divide itemInfo em partes usando , como separador e pega a primeira parte [0] código 
                        const codigo = itemInfo.split(',')[0];    
                        // Adiciona o código do item ao conjunto itensNoPedido
                        itensNoPedido.add(codigo);
                    }
                //---------------------------------------------------------------------
                
                //---------------------------------------------------------------------
                    for (const itemInfo of itens) { //itemInfo é tipo o [indice] em C
                        //Pega partes usando a vírgula como separador ('cafe, 1')
                        const [codigo, quantidade] = itemInfo.split(',');
                
                        //Procura o objeto no cardápio que corresponde ao código
                        const item = this.cardapio.find(function(item) {
                            return item.codigo === codigo; //se for igual retorna
                        });
                        
                        if (!item) { //Verifica se o código do item é válido
                            return "Item inválido!";
                        }
    
                        if (quantidade <= 0) { //Verifica se a quantidade é válida
                            return "Quantidade inválida!";
                        }
                        
                        if (item.extra) { //Verifica se o item é extra (codigo: chantily, queijo | extra: cafe, sanduiche)
                            if (!itensNoPedido.has(item.extra)) { //Verifica se o item principal não! está nos pedidos
                                return "Item extra não pode ser pedido sem o principal";
                            }
                        }
    
                        //Calcula o valor dos itens e coloca no total+=valores
                        total += item.valor * quantidade;
                    }
                //---------------------------------------------------------------------
    
                //Aplica o desconto ou acréscimo no total da compra de acordo com a forma de pagamento
                total *= this.descontosAcrecimos[formaDePagamento];
                //Formata o valor total da compra com o símbolo 'R$', duas casas decimais, trocando o 0.0 por 0,0 para passar nos testes
                const valorFormatado = `R$ ${total.toFixed(2).replace('.', ',')}`;
    
            return valorFormatado;
            }
        //------------------------------------------------------------------------------------------------------------
    }
    
    export { CaixaDaLanchonete }; //precisa disso para os outros arquivos terem acesso - tests.js