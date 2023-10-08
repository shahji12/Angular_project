import 'cypress-file-upload';
import {slowCypressDown} from "cypress-slow-down";

slowCypressDown(500);


describe('slider', ()=>{

  it('Should login if form is not valid', () => {
    cy.visit('/')
    // cy.contains('app is running!')
      cy.url().should('include','login');
      cy.get('[formControlName="email"]').type('shahzaib@gmail.com');
      cy.get('[formControlName="password"]').type('admin123');
      cy.get('.btn').click();
      cy.url().should('include', 'home');
  })

  it('Should redirect to add slider route', () => {
    cy.visit('/')
    // cy.contains('app is running!')
      // cy.url().should('include','home');
      cy.get('[formControlName="email"]').type('shahzaib@gmail.com');
      cy.get('[formControlName="password"]').type('admin123');
      cy.get('.btn').click();
      cy.get('.openbtn').click();
      cy.get('[data-cy="add-slider"]').click();
      cy.url().should('include', 'main/main');
  });
  it('Should add slider', () => {
    // cy.visit('/')
    // cy.url().should('include','main/main')
    cy.get('[data-cy="add-sliders"]').click();
    cy.get('[formControlName="title"]').type('Slider new');
    cy.get('[formControlName="detail"]').type('Testing with cypress');
    const fixture = 'download.jpg';
    cy.get('[data-cy="imgUrl"]').attachFile(fixture);
    cy.get('[data-cy="add-data"]').click();
  })

});
