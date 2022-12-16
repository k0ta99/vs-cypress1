/// <reference types="Cypress" />

import { faker } from '@faker-js/faker'
import {addOrganization} from "../pageObjects/addOrganizationPOM"
import {loginPOM} from "../pageObjects/loginPOM"

describe("add organization tests", () =>{
    before("login into the app ", () =>{
        cy.visit("/")
        cy.url().should("include", "/login");
        loginPOM.loginHeading.should("exist")
        .and("have.text", "Log in with your existing account")
        loginPOM.loginButton.should("be.visible")
        .and("have.css", "background-color", 'rgb(78, 174, 147)');
        loginPOM.login(Cypress.env("userEmail"), Cypress.env("userPassword"))
        cy.url().should("not.include", "/login");
    })

    let orgId;

    let createOrgData = {
        orgName : faker.lorem.word()
    }

    it("create organization", () =>{
        cy.intercept(
            "POST",
            "https://cypress-api.vivifyscrum-stage.com/api/v2/organizations"
        ).as("orgCreatedSuccessfully")

        cy.url().should("include", "my-organizations");
       addOrganization.addOrganization(createOrgData.orgName);
        
        cy.wait("@orgCreatedSuccessfully").then(interception =>{
            console.log("INTERCEPTION", interception)
            expect(interception.response.statusCode).to.eq(201);
            expect(interception.response.body.id).to.exist;
            orgId = interception.response.body.id;
            cy.url().should("include", orgId);
        })

        addOrganization.orgTitle.should("exist")
        .and("have.text", createOrgData.orgName)
    })
})