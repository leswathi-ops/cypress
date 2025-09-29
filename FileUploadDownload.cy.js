import { uploadFile } from '../Page objects/upload.js';
import { uploadElements } from '../Page objects/locators/upload_elements.js';

describe("Upload and Download files", () => {
  const files = ['Test1.docx', 'Test2.pdf'];
  let uploadedFiles = [];

  function downloadFile(file) {
    cy.get(uploadElements.downloadButton).last().click();
    cy.wait(5000);
    cy.readFile(`cypress/downloads/${file}`, { timeout: 30000 }).should('exist');
  }

  beforeEach(() => {
    cy.session("fileio-session", () => {
      cy.visit("https://www.file.io/");
    });
  });

  it("Upload multiple files", () => {
    cy.wrap(files).each(uploadFile);
  });

  it("Download all files", () => {
    cy.wrap(files).each((file) => {
      uploadFile(file);
      downloadFile(file);
    });
  });

  it("Download specific file", () => {
    cy.wrap(files).each(uploadFile);
    cy.contains(uploadElements.uploadedFileName, "Test4.png")
      .parents(uploadElements.sharingBucketContainer)
      .find(uploadElements.downloadAllButton)
      .click();
    cy.wait(5000);
    cy.readFile(`cypress/downloads/Test4.png`, { timeout: 30000 }).should('exist');
  });

  it.only("Download non-existing file", () => {
    cy.wrap(files).each(uploadFile);
    cy.wait(20000);
    cy.contains(uploadElements.uploadedFileName, "Test.png")
      .should('not.exist');
  });
});

