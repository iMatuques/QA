//rodar api e banco de dados 'npm run dev'
// rodar cypress 'npx cypress open
// rodar cypress CLI 'npx cypress run'
//npx cypress run --env allure=true
//npx allure serve 
//import {faker} from '@faker-js/faker/locale/de';

describe('tasks', () => {

    let testData;

    before(() => {
        cy.fixture('tasks').then(t => {
            testData = t
    }) 
})

    context('register', () => {

    const taskName = 'finish the cypress course'

    it('register new task', () => {

        // DELETE request to delete the task before starting the test, this way the test mass will not be burned
        cy.removeTaskByName(taskName)

        //calling the block of steps to register information
       cy.createTask(taskName)

        //validates that the element is visible and searches for it
        cy.contains('main div p', taskName)
            .should('be.visible')
    })

    it('do not allow duplicate tasks', () => {

        const task = testData.dup

        //calling the delete information step block
       cy.removeTaskByName(task.name)

        //using the api to see if you have a duplicate task
        cy.postTask(task)

         cy.createTask(task.name)

        //validate that the task already exists using the alert modal text
        cy.get('.swal2-html-container')
            .should('be.visible')
            .should('have.text', 'Task already exists!')
    })

    it('required field', () => {
        cy.createTask()
        cy.isRequired('This is a required field')
    })

    })

    context('upadate', () => {
        it('complete the task', () => {
            
        const task = {
            name: 'finish the cypress course',
            is_done: false
        }
        
        cy.removeTaskByName(task.name)
        cy.postTask(task)

        cy.visit('/')

        cy.contains('p', task.name)
             .parent()
             .find('button[class*=ItemToggle]') //buscar elemento dentro do elemento pai
             .click()

            cy.contains('p', task.name)
             .should('have.css', 'text-decoration-line', 'line-through')
        })
    })

    context('delete', () => {
        it('delete task', () => {
            
        const task = {
            name: 'buy sunscreen',
            is_done: false
        }
        
        cy.removeTaskByName(task.name)
        cy.postTask(task)

        cy.visit('/')

        cy.contains('p', task.name)
             .parent()
             .find('button[class*=ItemDelete]') //fetch element within parent element
             .click()

            cy.contains('p', task.name)
             .should('not.exist') //validates that the task does not exist
        })
    } )
})

