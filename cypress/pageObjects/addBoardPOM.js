class AddBoard{
    get chooseOrg(){
        return cy.get(".vs-c-my-organization__body").first().find(".vs-c-my-organization__label").first();
    }

    get orgName(){
        return cy.get("h1");
    }

    get OKButton(){
        return cy.get('.vs-c-modal--features-button > .vs-c-btn')
    }

    get addNewBoard(){
        return cy.get(".vs-c-organization-boards__item--add-new");
    }

    get boardTitle(){
        return cy.get(".vs-c-modal__body").find("input[type='text']").last();
    }

    get kanbanRadioBttn(){
        return cy.get(".vs-c-modal--board-type-form").find(".vs-c-radio-check").last()
    }

    get nextButton(){
        return cy.get(".dialog-footer").find("button").last();
    }
   

    get finishButton(){
        return cy.get(".dialog-footer").find("button").last();
    }

    addBoard(brdTitle){
        this.addNewBoard.click()
        this.boardTitle.type(brdTitle)
        this.nextButton.click()
        this.kanbanRadioBttn.click()
        this.nextButton.click()
        this.nextButton.click()
        this.nextButton.click()
        this.finishButton.click()
    }

    clickOrg(){
        this.chooseOrg.click()
        this.OKButton.click()
    }

}

export const addBoard = new AddBoard()