describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', `${Cypress.env('BACKEND')}/testing/reset`)
    const firstUser = {
      name: 'Kalle Kayttaja',
      username: 'kkayttaja',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, firstUser)
    const secondUser = {
      name: 'Enni Esimerkki',
      username: 'eesimerkki',
      password: 'salainen',
    }
    cy.request('POST', `${Cypress.env('BACKEND')}/users`, secondUser)
    cy.visit('')
  })

  it('Login form is shown', function () {
    cy.contains('username')
    cy.contains('password')
    cy.contains('login')
  })

  describe('Login', function () {
    it('succeeds with correct credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('kkayttaja')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('Kalle Kayttaja logged in')
    })

    it('fails with wrong credentials', function () {
      cy.contains('login').click()
      cy.get('#username').type('kkayttaja')
      cy.get('#password').type('vaarin')
      cy.get('#login-button').click()
      cy.get('.error').contains('Wrong username or password')
    })
  })

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'kkayttaja', password: 'salainen' })
      cy.visit('')
    })

    it('A blog can be created', function () {
      cy.get('#submitButton').click()
      cy.get('#title').type('SARA PARIKKA')
      cy.get('#author').type('Sara Parikka')
      cy.get('#url').type('saraparikka.com')
      cy.get('#submitBlogButton').click()
      cy.get('.notification').contains(
        'A new blog SARA PARIKKA by Sara Parikka added',
      )
      cy.get('.blogTitles').contains('SARA PARIKKA')
    })

    it('A blog can be liked', function () {
      cy.addBlog({
        title: 'Kasvisannos',
        author: 'Anita',
        url: 'kasvisannos.fi',
      })
      cy.contains('show').click()
      cy.get('#likeButton').click()
      cy.wait(500, { log: false })
      cy.get('#likeButton').click()
      cy.get('#listLikes').contains(2)
    })

    it('A blog can be removed', function () {
      cy.addBlog({
        title: 'Kasvisannos',
        author: 'Anita',
        url: 'kasvisannos.fi',
      })
      cy.addBlog({
        title: 'SARA PARIKKA',
        author: 'Sara Parikka',
        url: 'saraparikka.com',
      })
      cy.contains('show').click()
      cy.contains('Delete').click()
      cy.get('.notification').contains('Kasvisannos by Anita removed')
      cy.get('.blogTitles').should('not.contain', 'Kasvisannos')
    })

    it('Only user who added blog can see remove button', function () {
      cy.addBlog({
        title: 'Kasvisannos',
        author: 'Anita',
        url: 'kasvisannos.fi',
      })
      cy.contains('Logout').click()
      cy.login({ username: 'eesimerkki', password: 'salainen' })
      cy.visit('')
      cy.contains('show').click()
      cy.get('.blogTitles').should('not.contain', 'Delete')
    })

    it('Most liked blog is first on a list', function () {
      cy.addBlog({
        title: 'Tuulanneli',
        author: 'Tuulanneli',
        url: 'tuulanneli.fi',
      })
      cy.addBlog({
        title: 'Kasvisannos',
        author: 'Anita',
        url: 'kasvisannos.fi',
      })
      cy.addBlog({
        title: 'SARA PARIKKA',
        author: 'Sara Parikka',
        url: 'saraparikka.com',
      })
      cy.get('.blogTitles').eq(1).contains('show').click()
      cy.get('#likeButton').click()
      cy.contains('hide').click()
      cy.get('.blogTitles').eq(2).contains('show').click()
      cy.get('#likeButton').click()
      cy.wait(500, { log: false })
      cy.get('#likeButton').click()
      cy.get('.blogTitles').eq(0).should('contain', 'SARA PARIKKA')
    })
  })
})
