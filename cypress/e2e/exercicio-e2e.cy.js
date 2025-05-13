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
      //Login no sistema
      cy.login('paula.teste@teste.com.br', 'teste@123')
      cy.get('.woocommerce-MyAccount-content > :nth-child(2)').should('contain', 'Olá, paula.teste (não é paula.teste? Sair)')
      //Pesquisa dos produtos adicionando ao carrinho
      cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[0].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[0].tamanho, dados[0].cor, dados[0].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[0].nomeProduto)
      })
      cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[1].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[1].tamanho, dados[1].cor, dados[1].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[1].nomeProduto)
      })
      cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[2].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[2].tamanho, dados[2].cor, dados[2].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[2].nomeProduto)
      })
      cy.fixture('produtos').then(dados => {
        produtosPage.buscarProduto(dados[3].nomeProduto)
        produtosPage.addProdutoCarrinho(dados[3].tamanho, dados[3].cor, dados[3].quantidade)
        cy.get('.woocommerce-message').should('contain', dados[3].nomeProduto)
      })
      //Preenchendo dados de checkout
      cy.get('#cart > .dropdown-toggle').click()
      cy.get('#cart > .dropdown-menu > .widget_shopping_cart_content > .mini_cart_content > .mini_cart_inner > .mcart-border > .buttons > .checkout').click()
      cy.get('#billing_first_name').clear().type('Paula');
      cy.get('#billing_last_name').clear().type('Teste');
      cy.get('#select2-billing_country-container').click();
      cy.get('.select2-results__option').contains('Brasil').click();
      cy.get('#billing_address_1').clear().type('Rua das Flores, 123');
      cy.get('#billing_city').clear().type('São Paulo');
      cy.get('#select2-billing_state-container').click();
      cy.get('.select2-results__option').contains('São Paulo').click();
      cy.get('#billing_postcode').clear().type('06290070');
      cy.get('#billing_phone').clear().type('123456789');
      cy.get('#billing_email').clear().type('paula.teste@teste.com.br');
      cy.get('#payment_method_cod').click()
      cy.get('#terms').click()
      cy.get('#place_order').click()
      //logout do sistema
      cy.get('.topbar-inner > :nth-child(1) > .list-inline > :nth-child(2) > a').click()
    });


})


