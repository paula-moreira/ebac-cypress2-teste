Cypress.Commands.add('login', (usuario, senha) => {
    cy.get('#username').type(usuario)
    cy.get('#password').type(senha, {log: false})
    cy.get('.woocommerce-form > .button').click()
});

Cypress.Commands.add('detalhesConta', (nome, sobrenome, usuario) => {
    cy.get('#account_first_name').type(nome)
    cy.get('#account_last_name').type(sobrenome)
    cy.get('#account_display_name').type(usuario)
    cy.get('.woocommerce-Button').click()
});

Cypress.Commands.add('preencherCheckout', (dadosCheckout, pais, estado) => {
  // Preenche os campos simples (input text)
  Object.entries(dadosCheckout).forEach(([seletor, valor]) => {
    cy.get(seletor).clear().type(valor);
  });

  // Seleciona país
  cy.get('#select2-billing_country-container').click();
  cy.get('.select2-results__option').contains(pais).click();

  // Seleciona estado
  cy.get('#select2-billing_state-container').click();
  cy.get('.select2-results__option').contains(estado).click();

  // Seleciona forma de pagamento e aceita termos
  cy.get('#payment_method_cod').check({ force: true });
  cy.get('#terms').check({ force: true });

  // Finaliza pedido
  cy.get('#place_order').click();
});
