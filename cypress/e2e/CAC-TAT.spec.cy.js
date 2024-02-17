//<reference types="Cypress"/>

const { expect } = require("chai")

//const { functionsIn } = require("cypress/types/lodash")

describe('Central de Atendimento ao Cliente TAT', function () {

  beforeEach(() => {
    // runs before each test in the block
    cy.visit('../../src/index.html')
  })

  it('verifica o título da aplicação', function () {
    //Validando se o título da página visitada é 'Central de Atendimento ao Cliente TAT', para isso,
    //Utilizei o comando cy.title(), que recupera o título e a função should(condição,valor) utilizando
    //como condição o eq para equals e o segundo parametro como o texto proposto
    cy.title().should('be.equal', 'Central de Atendimento ao Cliente TAT')
  })

  it('verifica se o título do formulário esta correto', function () {
    cy.get('#title').contains('h1', 'CAC')
  })

  it('testando visible da obrigatoriedade do telefone, ao clicar no mesmo como meio de contato', function () {
    cy.get('#phone-checkbox').check()
    cy.get('.phone-label-span').should('be.visible')
  })

  it('enviando formulário com dados válidos', function () {
    cy.get('#firstName').type('Yuri')
    cy.get('#lastName').type('Moura')
    cy.get('#email').type('copiaNaoComedia@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#phone').type('99999-9999')
    cy.get('#product').select(1)
    cy.get('#open-text-area').type('Praticando os comandos click, type e get ', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.success > strong').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário com um email com formatação inválida', function () {
    cy.contains('button', 'Enviar').click()
    cy.get('.error > strong').should('be.visible')
  })

  it('validando a inserção de valores alfanuméricos no campo telefone', function () {
    cy.get('#phone').type('abc').should('not.have.value', 'abc')
  })

  it('exibe mensagem de erro quando o telefone se torna obrigatório mas não é preenchido antes do envio do formulário', function () {
    cy.get('#firstName').type('Yuri')
    cy.get('#lastName').type('Moura')
    cy.get('#email').type('copiaNaoComedia@gmail.com')
    cy.get('#phone-checkbox').check()
    cy.get('#product').select(1)
    cy.get('#open-text-area').type('Praticando os comandos click, type e get ', { delay: 0 })
    cy.contains('button', 'Enviar').click()
    cy.get('.error > strong').should('be.visible')
  })

  it('preenche e limpa os campos nome, sobrenome, email e telefone', function () {
    cy.get('#firstName').type('Yuri', { delay: 0 }).should('have.value', 'Yuri').clear().should('have.value', '')
    cy.get('#lastName').type('Moura', { delay: 0 }).should('have.value', 'Moura').clear().should('have.value', '')
    cy.get('#email').type('copiaNaoComedia@gmail.com', { delay: 0 }).should('have.value', 'copiaNaoComedia@gmail.com').clear().should('have.value', '')
    cy.get('#phone').type('99999999', { delay: 0 }).should('have.value', '99999999').clear().should('be.empty')
    cy.contains('button', 'Enviar').click()
    cy.get('.error > strong').should('be.visible')
  })

  it('exibe mensagem de erro ao submeter o formulário sem preencher os campos obrigatórios', function () {
    cy.get('button[type="submit"]').click()
    cy.get('.error > strong').should('be.visible')
  })

  it('envia o formuário com sucesso usando um comando customizado', function () {
    const project = {
      firstname: 'Yuri',
      lastname: 'Moura',
      email: 'copiaNaoComedia@gmail.com',
      textArea: 'Gerando comando customizavel'
    }
    cy.fillMandatoryFieldsAndSubmit(project)
  })

  it('selecionando o valor Youtube da caixa de seleção de produtos - Pelo TEXTO', function () {
    cy.get('#product').select('YouTube').should('have.value', 'youtube')
    const project = {
      firstname: 'Yuri',
      lastname: 'Moura',
      email: 'copiaNaoComedia@gmail.com',
      textArea: 'Gerando comando customizavel'
    }
    cy.fillMandatoryFieldsAndSubmit(project)
  })

  it('selecionando o valor Mentoria da caixa de seleção de produtos - pelo valor', function () {
    cy.get('#product').select('mentoria').should('have.value', 'mentoria')
    const project = {
      firstname: 'Yuri',
      lastname: 'Moura',
      email: 'copiaNaoComedia@gmail.com',
      textArea: 'Gerando comando customizavel'
    }
    cy.fillMandatoryFieldsAndSubmit(project)
  })


  it('selecionando o valor Blog da caixa de seleção de produtos - pelo indice (lembrando que começa por 0)', function () {
    cy.get('#product').select(1).should('have.value', 'blog')
    const project = {
      firstname: 'Yuri',
      lastname: 'Moura',
      email: 'copiaNaoComedia@gmail.com',
      textArea: 'Gerando comando customizavel'
    }
    cy.fillMandatoryFieldsAndSubmit(project)
  })

  it('selecionando o valor Feedback da raionGroup', function () {
    //cy.get('input[type="radio"]').check('feedback').should('be.checked')
    cy.get('input[type="radio"][value="feedback"]').check().should('be.checked')
    const project = {
      firstname: 'Yuri',
      lastname: 'Moura',
      email: 'copiaNaoComedia@gmail.com',
      textArea: 'Gerando comando customizavel'
    }
    cy.fillMandatoryFieldsAndSubmit(project)
  })

  it('selecionando todos os valores de um radiongroup', function () {
    //cy.get('input[type="radio"]').check('feedback').should('be.checked')
    cy.get('input[type="radio"]')
      .should('have.length', 3)
      .each(function ($radio) {
        cy.wrap($radio).check()
        cy.wrap($radio).should('be.checked')
      })
    const project = {
      firstname: 'Yuri',
      lastname: 'Moura',
      email: 'copiaNaoComedia@gmail.com',
      textArea: 'Gerando comando customizavel'
    }
    cy.fillMandatoryFieldsAndSubmit(project)
  })

  it('marcando e desmarcando as checkboxes', function () {
    //cy.get('input[type="radio"]').check('feedback').should('be.checked')

    //marca todos
    cy.get('input[type="checkbox"]')
      .check()
      .should('be.checked')

    // cy.get('input[type="checkbox"]')
    //   .should('have.length',2)
    //   .each(function ($checkbox) {
    //     cy.wrap($checkbox).check()
    //     cy.wrap($checkbox).should('be.checked')
    // })

    cy.get('input[type="checkbox"]')
      .last()
      .uncheck()
      .should('be.not.checked')
  })

  it('marcando e desmarcando as checkboxes', function () {
    //cy.get('input[type="radio"]').check('feedback').should('be.checked')

    //marca todos
    cy.get('input[type="checkbox"][value="phone"]')
      .check()
      .should('be.checked')

    cy.get('span[class="phone-label-span required-mark"]')
      .should('be.visible')
  })

  it('trabalhando com selectFile', function () {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json')
      //.should('contains.value','/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.be.equals('example.json')
      })
  })

  it('trabalhando com selectFile - Drag-Drop', function () {
    cy.get('input[type="file"]#file-upload')
      .should('not.have.value')
      .selectFile('./cypress/fixtures/example.json', { action: 'drag-drop' })
      //.should('contains.value','/example.json')
      .should(function ($input) {
        expect($input[0].files[0].name).to.be.equals('example.json')
      })
  })

  it('trabalhando com selectFile - trabalhando com alias', function () {
    cy.fixture('example.json').as('sampleFile') //crio o alias sampleFile
    //utilizo o alias abaixo com @ 
    cy.get('input[type="file"]#file-upload').selectFile('@sampleFile').should(function($input){expect($input[0].files[0].name).to.be.equals('example.json')})
  })

  it('Validando dados em outra tela do navegados',function(){
    //por conveção, todo navegar ao verificar uma atributo ancora <a>, se o mesmo possui ser atributo targer como _blank, o mesmo abre o href em outra página, logo,
    // se removemos o atributo target da ancora o comportamento muda, assim, abrindo a tela na mesma aba do navegador, para isso usamos o método .invoke() 
    //para remover esse atributo targer
    cy.get('#privacy a')
    .should('have.attr','target','_blank')
  })

  it('Validando dados em outra tela do navegados',function(){
    //por conveção, todo navegar ao verificar uma atributo ancora <a>, se o mesmo possui ser atributo targer como _blank, o mesmo abre o href em outra página, logo,
    // se removemos o atributo target da ancora o comportamento muda, assim, abrindo a tela na mesma aba do navegador, para isso usamos o método .invoke() 
    //para remover esse atributo targer
    cy.get('a[href="privacy.html"]')
    .invoke('removeAttr','target')
    .click()
    cy.contains('Talking About Testing').should('be.visible')
  })
}) 