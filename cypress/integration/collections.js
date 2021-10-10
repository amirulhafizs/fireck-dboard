/// <reference types="cypress" />

describe("Collection", () => {
  let collectionName;

  before(() => {
    cy.visit(Cypress.env("APP_URL"));
    cy.window()
      .its("store")
      .invoke("dispatch", {
        type: "SET_USER",
        payload: {
          token:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJwYXNzd29yZCI6IiQyYSQwOCRaNUUyaVplL3lMNlZnVWh6dmNBeWZ1NVBURDY0NkNNQjhUa0EuZHBBNTM5UzdpeW1uM2YyQyIsImVtYWlsIjoiYWRtaW5AYWRtaW4uY29tIiwic3Vic2NyaWJlRW1haWxzIjpmYWxzZSwicm9sZSI6InN1cGVyLWFkbWluIiwiaWF0IjoxNjMzMjcxNjM2fQ.ht5IgGJpZBGGBDdHexoKWCEJ9S_14_scC15qOm5MX2Q",
        },
      });
  });
  it("Create collection", () => {
    cy.contains("button", /collections/i).click();
    cy.contains(/add collection/i).click();
    collectionName = Date.now();
    cy.get(`input[name="name"]`).type(`${collectionName}{enter}`);
    cy.get("select").select(collectionName.toString());
  });

  it("Delete collection", () => {
    cy.get(`svg[data-testid="EditRoundedIcon"]`).click();
    cy.contains("button", /delete collection/i).click();
    cy.contains(/want to delete/i)
      .next()
      .contains("button", /submit/i)
      .click();
    cy.contains("option", collectionName.toString()).should("not.exist");
  });
});
