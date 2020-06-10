describe('Blog app', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/testing/reset')
        const user = {
            username: "mmatila",
            password: "salasana",
            name: "Mister Tester"
        }
        cy.request('POST', 'http://localhost:3001/api/users/', user)
        cy.visit('http://localhost:3000')
    })

    it('Login from is shown', function () {
        cy.contains('Log in to application')
        cy.contains('username')
        cy.contains('password')
        cy.contains('login')
    })

    describe('Login', function () {
        it('succeeds with correct credentials', function () {
            cy.get('#usernameField').type('mmatila')
            cy.get('#passwordField').type('salasana')
            cy.get('#login-button').click()
            cy.contains('Mister Tester logged in')
        })

        it('fails with wrong credentials', function () {
            cy.get('#usernameField').type('mmatila')
            cy.get('#passwordField').type('wrong password')
            cy.get('#login-button').click()
            cy.contains('wrong credentials')
        })
    })
})

describe('When logged in', function () {
    beforeEach(function () {
        cy.request('POST', 'http://localhost:3001/api/login', {
            username: 'mmatila', password: 'salasana'
        }).then(response => {
            localStorage.setItem('loggedBlogAppUser', JSON.stringify(response.body))
            cy.visit('http://localhost:3000')
        })
    })

    it('A blog can be created', function () {
        cy.contains('new blog').click()
        cy.contains('create new')
        cy.get('#title').type('title')
        cy.get('#author').type('author')
        cy.get('#url').type('url')
        cy.get('#createButton').click()

        cy.contains('by author')
        cy.contains('show more')
    })

    it('A blog can be liked', function () {
        cy.contains('new blog').click()
        cy.get('#title').type('title')
        cy.get('#author').type('author')
        cy.get('#url').type('url')
        cy.get('#createButton').click()
        cy.get('#showMoreButton').click()
        cy.get('#blogLikeButton').click()
    })

    it('A blog can be deleted', function() {
        cy.contains('new blog').click()
        cy.get('#title').type('title')
        cy.get('#author').type('author')
        cy.get('#url').type('url')
        cy.get('#createButton').click()
        cy.get('#showMoreButton').click()
        cy.get('#deleteButton').click()
        cy.contains('blog removed successfully')
    })
})