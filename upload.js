import { uploadElements } from './locators/upload_elements.js';

export function uploadFile(file) {
    cy.visit('https://www.file.io/')
    cy.wait(3000); 
    cy.get(uploadElements.fileInput, { timeout: 20000 })
      .selectFile(`cypress/fixtures/${file}`, { force: true });

    cy.get(uploadElements.loadingSpinner, { timeout: 40000 }).should("not.exist");
    cy.get(uploadElements.uploadedFileName).should("contain.text", file);

    cy.get(uploadElements.uploadedFileName).each($el => {
      const name = $el.text().trim();
      return name;
    });
    cy.get('button').contains('Done').click();
}
