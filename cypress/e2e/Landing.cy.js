import path from "path";
describe("Landing Page Tests", () => {
  beforeEach(() => {
    cy.visit("/");
  });
  it("Contains correct heading", () => {
    const Year = new Date().getFullYear();
    cy.getTestData("landing-heading").contains(`AsyncAPI Conf On Tour ${Year}`);
  });

  it("Should contain About Section", () => {
    cy.getTestData("about-section").should("be.visible");
  });

  it("Verify the downloaded file", () => {
    cy.getTestData("prospectus-download").should("be.visible");
    cy.getTestData("prospectus-download").click();

    const Year = new Date().getFullYear();
    const downloadsFolder = Cypress.config("downloadsFolder");
    cy.readFile(path.join(downloadsFolder, `conf ${Year}.pdf`));
  });

  it("Should contain Speakers section", () => {
    cy.getTestData("speakers-section").should("be.visible");
  });

  it("Should contain Ticket section", () => {
    cy.getTestData("ticket-section").should("be.visible");
  });
   
  it("Should contain Ticket container section",() => {
    cy.getTestData("ticket-card-container").should("be.visible");
  })

  it("Should render Slider for small screen devices", () => {
    cy.viewport(0,590);
    cy.getTestData("ticket-card-container").find("div.slick-slider")
  });

  it("Should verify that the container has a child with overflow-x-scroll for medium and large screen", () => {
    cy.viewport(591,1500);
    cy.getTestData("ticket-card-container").find("div.overflow-x-scroll")
  });

  it("Should contain Sponsor component", () => {
    cy.getTestData("sponsor-section").should("be.visible");
  });

  it("Subscribe Button is functional", () => {
    cy.getTestData("subscribe-button").invoke("removeAttr", "target").click();

    cy.origin("https://www.asyncapi.com/newsletter", () => {
      cy.url().should("match", /https:\/\/www\.asyncapi\.com\/[a-z]{2}\/newsletter/);
    });
  });
});
