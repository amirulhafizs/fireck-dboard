/// <reference types="cypress" />

describe("Fireck first test", () => {
  it("What does it do?", () => {
    expect(true).to.equal(true);
  });

  it("Load cms", () => {
    cy.visit("http://localhost:8888");
  });

  // it("Login", () => {
  //   cy.get(`input[name="email"]`).type("admin@admin.com");
  //   cy.get(`input[name="password"]`).type("Admin123");
  //   cy.get("button").click();
  //   cy.url().should("not.include", "login");
  // });
});
