import { faker } from '@faker-js/faker'
import { addBoard } from '../pageObjects/addBoardPOM'
import {addOrganization} from "../pageObjects/addOrganizationPOM"
import { delBoard } from '../pageObjects/deleteBoardPOM'
import {loginPOM} from "../pageObjects/loginPOM"

describe("delete board tests", () =>{
    let orgData = {
        orgName: faker.lorem.word(),
        boardName: faker.lorem.word()
    }
    let orgId;
    let boardId;

    before("login into the app/create org ", () =>{
        cy.visit("/")
        cy.url().should("include", "/login");
        loginPOM.loginHeading.should("exist")
        .and("have.text", "Log in with your existing account")
        loginPOM.loginButton.should("be.visible")
        .and("have.css", "background-color", 'rgb(78, 174, 147)');
        loginPOM.login(Cypress.env("userEmail"), Cypress.env("userPassword"))
        cy.url().should("not.include", "/login");

    })

    it("delete board", () =>{
       addBoard.clickOrg();
       cy.intercept(
        "POST",
        "https://cypress-api.vivifyscrum-stage.com/api/v2/boards"
    ).as("boardAddedSuccessfully")

       addBoard.addBoard(orgData.boardName);

       addBoard.orgName.should("be.visible")
       .and("have.text", orgData.boardName)


       cy.wait("@boardAddedSuccessfully").then(interception =>{
        expect(interception.response.statusCode).to.eq(201);
        expect(interception.response.body.id).to.exist;
        boardId = interception.response.body.id
        cy.url().should("include", boardId);

       cy.intercept(
        "DEL",
        "https://cypress-api.vivifyscrum-stage.com/api/v2/boards/${boardId}"
       ).as("boardDeletedSuccessfully");
    })
       delBoard.deleteBoard();
       cy.wait("@boardDeletedSuccessfully").then(interception =>{
        expect(interception.response.statusCode).to.eq(201);
        expect(interception.response.body.id).to.not.exist;
        cy.url().should("not.include", boardId);
       })
        
        

        
    })
})