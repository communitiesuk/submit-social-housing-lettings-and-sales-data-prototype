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
    const { users } = req.session.data

    // Demo accounts
    switch (req.session.data['account-email']) {
      case 'admin@levellingup.gov.uk':
        req.session.data.account = users.ADMIN
        break
      case 'data.coordinator@malinsgroup.co.uk':
        req.session.data.account = users['DC-OWNER']
        break
      case 'data.provider@malinsgroup.co.uk':
        req.session.data.account = users['DP-OWNER']
        break
      case 'data.coordinator@believehousing.co.uk':
        req.session.data.account = users['DC-OWNER_MANAGER']
        break
      case 'data.provider@believehousing.co.uk':
        req.session.data.account = users['DP-OWNER_MANAGER']
        break
      case 'data.coordinator@placesforpeople.co.uk':
        req.session.data.account = users['DC-OWNER_AGENT']
        break
      case 'data.provider@placesforpeople.co.uk':
        req.session.data.account = users['DP-OWNER_AGENT']
        break
      case 'data.coordinator@bcwa.org.uk':
        req.session.data.account = users['DC-AGENT']
        break
      case 'data.provider@bcwa.org.uk':
        req.session.data.account = users['DP-AGENT']
        break
      default:
        req.session.data.account = users.ADMIN
    }

    req.session.data.token = true

    res.redirect('/')
  })

  /**
   * Reset password
   */
  router.post('/account/reset-password', (req, res) => {
    req.flash('success', 'Your password has been reset. Sign in with your new password to continue.')
    res.redirect('/account/sign-in')
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
