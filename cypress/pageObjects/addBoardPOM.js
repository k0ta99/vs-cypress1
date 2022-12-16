class AddBoard{
    get addNewBoard(){
        return cy.get(".vs-c-organization-boards__item--add-new");
    }

    get boardTitle(){
        return cy.get("input[type='text']");
    }

    get kanbanRadioBttn(){
        return cy.get(".vs-c-radio-check").last();
    }

    get nextButton(){
        return cy.get(".vs-c-modal vs-c-modal--starter vs-c-modal--create-board").find("button").last();
    }

    get finishButton(){
        return cy.get("vs-c-modal vs-c-modal--starter vs-c-modal--create-board").find("button").last();
    }

    addBoard(brdTitle){
        this.addNewBoard.click()
        this.boardTitle.type(brdTitle)
        this.kanbanRadioBttn.click()
        this.nextButton.click()
        this.finishButton.click()
    }

}

export const addBoard = new AddBoard()