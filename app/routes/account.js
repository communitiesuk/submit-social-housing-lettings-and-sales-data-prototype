export const accountRoutes = (router) => {
  /**
   * Redirect to logs page if visit home page and signed in
   */
  router.get('/', (req, res) => {
    if (req.session.data.account) {
      res.redirect('/logs')
    } else {
      res.render('index')
    }
  })

  /**
   * Redirect to logs page if visit home page and signed in
   */
  router.get('/start/?:organisationId', (req, res) => {
    req.session.data.organisationId = req.params.organisationId

    res.render('index')
  })

  /**
   * Sign out
   */
  router.get('/account/sign-out', (req, res) => {
    if (req.session.data.account) {
      delete req.session.data.account
      delete req.session.data.token
    }

    res.redirect('/account/sign-in')
  })

  /**
   * Sign in
   */
  router.post('/account/sign-in', (req, res) => {
    const { account, organisationId, users } = req.session.data

    // Demo accounts
    switch (account.email) {
      case 'admin@levellingup.gov.uk':
        req.session.data.account = users.ADMIN
        break
      case 'data.coordinator@owning.gov.uk':
        req.session.data.account = users.DC001
        break
      case 'data.provider@owning.gov.uk':
        req.session.data.account = users.DP001
        break
      case 'data.coordinator@managing.org.uk':
        req.session.data.account = users.DCM01
        break
      default:
        req.session.data.account = users.DP001
    }

    req.session.data.token = true

    // If organisation ID set, use that instead of that in user account
    req.session.data.account.organisationId = organisationId || req.session.data.account.organisationId

    res.redirect('/logs')
  })

  /**
   * Reset password
   */
  router.post('/account/reset-password', (req, res) => {
    res.redirect('/account/sign-in?success=password-reset')
  })

  /**
   * Account pages
   */
  router.all('/account/:view?', (req, res) => {
    const view = req.params.view ? req.params.view : 'index'
    const { account } = req.session.data

    res.render(`account/${view}`, {
      account,
      query: req.query
    })
  })
}
