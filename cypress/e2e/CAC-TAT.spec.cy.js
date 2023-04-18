//<reference types="Cypress"/>

//const { functionsIn } = require("cypress/types/lodash")

describe('Central de Atendimento ao Cliente TAT', function() {
  beforeEach(() => {
    // runs before each test in the block
    cy.visit('../../src/index.html')
  })
  it('verifica o título da aplicação', function() { 
    //Validando se o título da página visitada é 'Central de Atendimento ao Cliente TAT', para isso,
    //Utilizei o comando cy.title(), que recupera o título e a função should(condição,valor) utilizando
    //como condição o eq para equals e o segundo parametro como o texto proposto
    cy.title().should('be.equal','Central de Atendimento ao Cliente TAT')
  }),
  it('verifica se o título do formulário esta correto',function(){
    cy.get('#title').contains('h1','CAC')
  }),
  it('testando visible da obrigatoriedade do telefone, ao clicar no mesmo como meio de contato',function(){
    cy.get('#phone-checkbox').click()
    cy.get('.phone-label-span').should('be.visible')
  })
  it('enviando formulário com dados válidos',function(){
    cy.get('#firstName').type('Yuri')
    cy.get('#lastName').type('Moura')
    cy.get('#email').type('copiaNaoComedia@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#phone').type('99999-9999')
    cy.get('#product').select(1)
    cy.get('#open-text-area').type('Praticando os comandos click, type e get ',{delay:0})
    cy.get('.button').click()
    cy.get('.success > strong').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida',function(){
    cy.get('.button').click()
    cy.get('.error > strong').should('be.visible')
  })
  it('validando a inserção de valores alfanuméricos no campo telefone',function(){
    cy.get('#phone').type('abc').should('not.have.value','abc')
  })
  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário',function(){
    cy.get('#firstName').type('Yuri')
    cy.get('#lastName').type('Moura')
    cy.get('#email').type('copiaNaoComedia@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#product').select(1)
    cy.get('#open-text-area').type('Praticando os comandos click, type e get ',{delay:0})
    cy.get('.button').click()
    cy.get('.error > strong').should('be.visible')
  })
  it('preenche e limpa os campos nome, sobrenome, email e telefone',function(){
    cy.get('#firstName').type('Yuri',{delay:100}).should('have.value','Yuri').clear().should('have.value','')
    cy.get('#lastName').type('Moura',{delay:100}).should('have.value','Moura').clear().should('have.value','')
    cy.get('#email').type('copiaNaoComedia@gmail.com',{delay:100}).should('have.value','copiaNaoComedia@gmail.com').clear().should('have.value','')
    cy.get('#phone').type('99999999',{delay:100}).should('have.value','99999999').clear().should('be.empty')
    cy.get('.button').click()
    cy.get('.error > strong').should('be.visible')
  })
  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios',function(){
    cy.get('button[type="submit"]').click()
    cy.get('.error > strong').should('be.visible')
  })
  it('envia o formuário com sucesso usando um comando customizado',function(){
    const project = {
      firstname:'Yuri',
      lastname:'Moura',
      email:'copiaNaoComedia@gmail.com',
      textArea:'Gerando comando customizavel'
    }
    cy.fillMandatoryFieldsAndSubmit(project)
  })
}) 