export const accountRoutes = (router) => {
  /**
   * Sign out
   */
  router.get('/account/sign-out', (req, res) => {
    if (req.session.data.account) {
      delete req.session.data.account
    }

    res.redirect('/account/sign-in')
  })

  /**
   * Sign in
   */
  router.post('/account/sign-in', (req, res) => {
    const { account, users } = req.session.data

    // Demo accounts
    switch (account.email) {
      case 'admin@communities.gov.uk':
        req.session.data.account = users.ADMIN
        break
      case 'data.coordinator@owning.gov.uk':
        req.session.data.account = users.DCOO1
        break
      case 'data.provider@owning.gov.uk':
        req.session.data.account = users.DPOO1
        break
      case 'data.coordinator@managing.org.uk':
        req.session.data.account = users.DCMO1
        break
      default:
        req.session.data.account = users.DPMO1
    }

    req.session.data.account.token = true

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
