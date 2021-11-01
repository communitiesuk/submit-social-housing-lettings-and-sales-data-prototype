import * as utils from '../utils.js'

export const usersRoutes = (router) => {
  router.all('/users', (req, res) => {
    const { account, users } = req.session.data
    const { referrer, success, userId } = req.query

    res.render('users/index', { account, referrer, success, userId, users })
  })

  router.get('/users/new', (req, res) => {
    const { users } = req.session.data
    const userId = utils.generateLogId()

    // Create a new blank user in session data
    users[userId] = {}

    res.redirect(`/users/${userId}/personal-details`)
  })

  router.post('/users/:userId/deactivate', (req, res) => {
    const { users } = req.session.data
    const { userId } = req.params

    users[userId].deactivated = true

    res.redirect(`/users?success=deactivated&userId=${userId}`)
  })

  router.get('/users/:userId/:view?', (req, res) => {
    const view = req.params.view ? req.params.view : 'user'
    const { userId } = req.params
    const { account, users } = req.session.data
    const { referrer, success } = req.query

    const user = utils.getEntryById(users, userId)
    const userPath = `/users/${userId}`

    if (user) {
      res.render(`users/${view}`, { account, referrer, success, user, users, userPath })
    } else {
      res.redirect('/users')
    }
  })
}
