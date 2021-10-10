/// <reference types="cypress" />

describe("Login", () => {
  before("Load app", () => {
    cy.visit("http://localhost:8888");
  });

  it("Login Bad Email", () => {
    cy.get(`input[name="email"]`).type("admin@admins.com");
    cy.get(`input[name="password"]`).type("Admin123");
    cy.get("button").click();
    cy.wait(3000);
    cy.get(`button`).contains("Login");
  });

  it("Login Bad Password", () => {
    cy.get(`input[name="email"]`).clear().type("admin@admin.com");
    cy.get(`input[name="password"]`).clear().type("Admin1234");
    cy.get("button").click();
    cy.wait(3000);
    cy.get(`button`).contains("Login");
  });

  it("Login Good", () => {
    cy.get(`input[name="email"]`).clear().type("admin@admin.com");
    cy.get(`input[name="password"]`).clear().type("Admin123");
    cy.get("button").click();
    cy.contains("Logout");
  });
});
