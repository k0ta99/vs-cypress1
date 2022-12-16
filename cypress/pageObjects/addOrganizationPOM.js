class AddOrganization{
    get OKButton(){
        return cy.get('.vs-c-modal--features-button > .vs-c-btn')
    }
    get addNewOrganization(){
        return cy.get(".vs-c-my-organization--add-new");
    }

    get orgNameLabel(){
        return cy.get("label");
    }

    get organizationNameInput(){
        return cy.get("input[type='text']");
    }

    get newOrgNextButton(){
        return cy.get('[name="next_btn"]');
    }

    get createOrgButton(){
        return cy.get('[name="next_btn"]');
    }

    get orgTitle(){
        return cy.get('.vs-l-organization__title').find("strong");
    }

    addOrganization(orgName){
        this.addNewOrganization.click()
        this.organizationNameInput.type(orgName)
        this.newOrgNextButton.click()
        this.createOrgButton.click()
        this.OKButton.click()
    }
}

export const addOrganization = new AddOrganization()