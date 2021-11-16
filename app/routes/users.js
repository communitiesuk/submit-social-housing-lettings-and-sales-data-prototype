import * as utils from '../utils.js'

export const userRoutes = (router) => {
  /**
   * Only admin users can view all users
   */
  router.all('/users', (req, res, next) => {
    const { data } = req.session
    const { organisationId } = data.account

    if (!res.locals.isAdmin) {
      return res.redirect(`/organisations/${organisationId}/users`)
    }

    next()
  })

  /**
   * List users
   */
  router.all(['/users', '/organisations/:organisationId/users'], (req, res) => {
    let { organisations, users } = req.session.data
    const { organisationId } = req.params

    // Convert users to array
    users = utils.objectToArray(users)

    // If path is scoped to organisation, only show users in that organisation
    // or any of its children
    let organisation
    let organisationPath = ''
    if (organisationId) {
      organisation = utils.getEntityById(organisations, organisationId)
      organisationPath = `/organisations/${organisationId}`

      const organisationRelationships = [
        organisationId,
        ...(organisation.children ? organisation.children : [])
      ]

      users = users.filter(user => organisationRelationships.includes(user.organisationId))
    }

    res.render('users/index', {
      query: req.query,
      organisation,
      organisationPath,
      users
    })
  })

  /**
   * Create user
   */
  router.get('/users/new', (req, res) => {
    const { users } = req.session.data
    const userId = utils.generateUniqueId()

    // Create a new blank user in session data
    users[userId] = {}

    res.redirect(`/users/${userId}/personal-details`)
  })

  /**
   * View user
   */
  router.get('/users/:userId/:view?', (req, res) => {
    const { account, organisations, users } = req.session.data
    const { userId } = req.params
    const view = req.params.view ? req.params.view : 'user'

    const user = utils.getEntityById(users, userId)
    const userPath = `/users/${userId}`
    const organisation = utils.getEntityById(organisations, account.organisationId)
    const organisationPath = `/organisations/${account.organisationId}`

    // Admin can add users to any organisation
    const allOrganisations = utils.objectToArray(organisations)

    // Data coordinators can add users to own organisation and its children
    const managedOrganisations = [organisation].concat(
      allOrganisations.filter(organisation => {
        if (organisation.parents) {
          return organisation.parents.includes(account.organisationId)
        }

        return false
      })
    )

    if (user) {
      res.render(`users/${view}`, {
        query: req.query,
        allOrganisations,
        managedOrganisations,
        organisation,
        organisationPath,
        user,
        users,
        userPath
      })
    } else {
      res.redirect('/users')
    }
  })

  /**
   * Delete user
   */
  router.post('/users/:userId/delete', (req, res) => {
    const { users } = req.session.data
    const { userId } = req.params

    delete users[userId]

    res.redirect('/users?success=deleted')
  })

  /**
   * Update user
   */
  router.post('/users/:userId/:view?', (req, res, next) => {
    const { users } = req.session.data
    const { userId, view } = req.params

    const userPath = `/users/${userId}`

    // Deactivate user
    if (view === 'deactivate') {
      users[userId].deactivated = true
      return res.redirect(userPath)
    }

    // Reactivate user
    if (view === 'reactivate') {
      users[userId].deactivated = false
      return res.redirect(userPath)
    }

    next()
  })
}
