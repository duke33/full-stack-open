describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'Mariano',
      username: 'dule_33',
      password: 'adksjlflkjsdflk'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Log in to application')
    cy.get('#username')
    cy.get('#password')
    cy.get('#login-button')

  })

  describe('Login',function() {


    it('succeeds with correct credentials', function() {
      cy.get('#username').type('dule_33')
      cy.get('#password').type('adksjlflkjsdflk')
      cy.get('#login-button').click()
      cy.contains('Mariano logged in')


    })

    it('fails with wrong credentials', function() {
      cy.get('#username').type('Wrong')
      cy.get('#password').type('Wrong')
      cy.get('#login-button').click()
      cy.contains('Wrong username or password')
    })

  })

  describe('When logged in', function() {
    beforeEach(function() {

      cy.login({ username: 'dule_33', password: 'adksjlflkjsdflk' })

    })

    it('A blog can be created be liked and deleted', function() {
      cy.contains('create new blog').click()


      cy.get('#title').type('Made with cypress')
      cy.get('#author').type('Mariano')
      cy.get('#url').type('https://www.cypress.io/')

      cy.get('#create').click()
      cy.contains('a new blog Made with cypress by Mariano added')

      cy.get('#viewButton').click()

      //Like a blog
      cy.get('#likeButton').click()
      cy.contains('likes 1')

      //Delete a blog
      cy.get('#removeButton').click()
      cy.get('.blogLong').should('not.exist')


    })

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.contains('new note').click()
        cy.get('input').type('another note cypress')
        cy.contains('save').click()
      })
      it('it can be made important', function () {
        // ...
      })
    })

    it.only('blogs are ordered according to likes with the blog with the most likes being first', function() {
      //Create three blogs
      cy.contains('create new blog').click()
      cy.get('#title').type('0 Likes')
      cy.get('#author').type('Mariano')
      cy.get('#url').type('https://www.cypress.io/')
      cy.get('#create').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('3 likes')
      cy.get('#author').type('Mariano')
      cy.get('#url').type('https://www.cypress.io/')
      cy.get('#create').click()

      cy.contains('create new blog').click()
      cy.get('#title').type('2 likes')
      cy.get('#author').type('Mariano')
      cy.get('#url').type('https://www.cypress.io/')
      cy.get('#create').click()

      cy.get('#viewButton').click()
      cy.get('#likeButton').click()

      cy.reload()



    })



  })

})
