/// <reference types="cypress" />
import produtosPage from "../support/page_objects/produtos.page";

context('Exercicio - Testes End-to-end - Fluxo de pedido', () => {
  /*  Como cliente 
      Quero acessar a Loja EBAC
      Para fazer um pedido de 4 produtos
      Fazendo a escolha dos produtos
      Adicionando ao carrinho
      Preenchendo todas opções no checkout
      E validando minha compra ao final */

  beforeEach(() => {
      cy.visit('minha-conta')
    });

  afterEach(() => {
    cy.screenshot ()
  })

  it('Deve fazer um pedido na loja Ebac Shop de ponta a ponta', () => {
      //TODO: Coloque todo o fluxo de teste aqui, considerando as boas práticas e otimizações
      //Realziar Login no sistema
      cy.login('paula.teste@teste.com.br', 'teste@123')
      cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, paula.teste (não é paula.teste? Sair)')
      //Pesquisar produtos para adicionar ao carrinho
      cy.fixture('produtos').then(dados => {
        Cypress._.each(dados, (produto) => {
        produtosPage.buscarProduto(produto.nomeProduto);
        produtosPage.addProdutoCarrinho(produto.tamanho, produto.cor, produto.quantidade);
        cy.get('.woocommerce-message').should('contain', produto.nomeProduto);
        })
      })
      //Preencher dados de checkout
      const dadosCheckout = {
        '#billing_first_name': 'Paula',
        '#billing_last_name': 'Teste',
        '#billing_address_1': 'Rua das Flores, 123',
        '#billing_city': 'São Paulo',
        '#billing_postcode': '06290070',
        '#billing_phone': '123456789',
        '#billing_email': 'paula.teste@teste.com.br'
      };
      // Acessa o carrinho e checkout
      cy.get('#cart > .dropdown-toggle').click();
      cy.get('#cart .checkout').click();
      // Preenchimento do Ckeckout
      cy.preencherCheckout(dadosCheckout, 'Brasil', 'São Paulo');
      //Validar compra - Verificar se o sistema finalizou com sucesso o meu pedido
      cy.get('.woocommerce-notice', {timeout: 5000})
        .should('be.visible')
        .and('contain.text', 'Obrigado. Seu pedido foi recebido');
      //Realziar logout do sistema
      cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2) > a').click()
    });
})


