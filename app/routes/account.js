export const accountRoutes = (router) => {
  /**
   * Redirect to logs page if visit home page and signed in
   */
  router.get('/', (req, res) => {
    const { account } = req.session.data

    if (account) {
      const homePage = res.locals.isAdmin
        ? '/organisations'
        : `/organisations/${account.organisationId}/logs`
      res.redirect(homePage)
    } else {
      res.render('index')
    }
  })

  /**
   * Prefill login with a demo account email address
   */
  router.get('/start/?:organisationId', (req, res) => {
    req.session.data.account = {}

    switch (req.params.organisationId) {
      case 'admin':
        req.session.data.account.email = 'admin@levellingup.gov.uk'
        break
      case 'data-coordinator':
        req.session.data.account.email = 'data.coordinator@owning.org.uk'
        break
      case 'data-provider':
        req.session.data.account.email = 'data.provider@owning.org.uk'
        break
      case 'data-coordinator-agent':
        req.session.data.account.email = 'data.coordinator@managing.org.uk'
        break
      default:
        req.session.data.account.email = 'data.provider@managing.org.uk'
    }

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
    const { account, organisations, users } = req.session.data

    // Demo accounts
    switch (account.email) {
      case 'admin@levellingup.gov.uk':
        req.session.data.account = users.ADMIN
        break
      case 'data.coordinator@owning.org.uk':
        req.session.data.account = users.DC001
        break
      case 'data.provider@owning.org.uk':
        req.session.data.account = users.DP001
        break
      case 'data.coordinator@managing.org.uk':
        req.session.data.account = users.DCM01
        break
      case 'data.provider@managing.org.uk':
        req.session.data.account = users.DPM01
        break
      default:
        req.session.data.account = users.DP001
    }

    req.session.data.token = true

    res.redirect('/')
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
