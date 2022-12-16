class DeleteBoard{
    get configureLink(){
        return cy.get(".vs-l-project__menu").find("a").last();
    }

    get deleteButton(){
        return cy.get(':nth-child(8) > .vs-c-settings-section > .vs-c-settings-section-form > .vs-c-btn > :nth-child(2)');
    }

    
    get yesButton(){
        return cy.get(".vs-u-text--right").find("button").last()
    }
    deleteBoard(){
        this.configureLink.click()
        this.deleteButton.click()
        this.yesButton.click()
    }
}

export const delBoard = new DeleteBoard()