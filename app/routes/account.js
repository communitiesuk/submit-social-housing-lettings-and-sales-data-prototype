export const accountRoutes = (router) => {
  router.get('/account/sign-out', (req, res) => {
    if (req.session.data.account) {
      delete req.session.data.account.token
    }

    res.redirect('/account/sign-in')
  })

  router.post('/account/sign-in', (req, res) => {
    const { account, users } = req.session.data

    // Demo accounts
    if (account.email === 'delia.cross@example.gov.uk') {
      req.session.data.account = users.EXDC1
    } else if (account.email === 'daisy.perkins@example.gov.uk') {
      req.session.data.account = users.EXDP1
    }

    req.session.data.account.token = true

    res.redirect('/logs')
  })

  router.post('/account/reset-password', (req, res) => {
    res.redirect('/account/sign-in?success=password-reset')
  })

  router.all('/account/:view?', (req, res) => {
    const view = req.params.view ? req.params.view : 'index'
    const { account } = req.session.data
    const { referrer, success } = req.query

    res.render(`account/${view}`, { account, referrer, success })
  })
}
