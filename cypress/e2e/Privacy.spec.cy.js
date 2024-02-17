const { expect } = require("chai")

describe('Privacy Screen testes', function () {

  beforeEach(() => {
    // runs before each test in the block
    cy.visit('../../src/privacy.html')
  })

  it.only('Validando dados em outra tela do navegados',function(){
    cy.contains('Talking Ab out Testing').should('be.visible')
  })

}) 