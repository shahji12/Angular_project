import { LoginComponent } from "./login.component";

describe('loginComponent', ()=>{

  it('should load login component', ()=>{
    cy.mount(LoginComponent);
  })
})
