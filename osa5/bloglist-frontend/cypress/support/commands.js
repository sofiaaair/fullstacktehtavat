

Cypress.Commands.add('login', ({ username, password }) => {
  cy.request('POST', `${Cypress.env('BACKEND')}/login`, {
    username, password
  }).then(({ body }) => {
    localStorage.setItem('loggedUser', JSON.stringify(body))
    cy.visit('')
  })
})

Cypress.Commands.add('addBlog', ({ title, author, url }) => {
  cy.request({
    url:`${Cypress.env('BACKEND')}/blogs`,
    method: 'POST',
    body: { title, author, url },
    headers:{
      'Authorization': `Bearer ${JSON.parse(localStorage.getItem('loggedUser')).token}`
    }
  })
  cy.visit('')
})