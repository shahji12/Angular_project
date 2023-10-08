import 'cypress-file-upload';
import {slowCypressDown} from "cypress-slow-down";

slowCypressDown(500);


describe('login', ()=>{
  it('Should not login if form is not valid', () => {
    cy.visit('/')
    // cy.contains('app is running!')
      cy.url().should('include','login');
      cy.get('[formControlName="email"]').type('shahzaib@gmail.com');
      cy.get('.btn').click();
      cy.url().should('not.include', 'home');

  });

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

});
