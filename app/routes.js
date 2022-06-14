import express from 'express'
import flash from 'express-flash-plus'
import { accountRoutes } from './routes/account.js'
import { logRoutes } from './routes/logs.js'
import { organisationRoutes } from './routes/organisations.js'
import { schemeRoutes } from './routes/schemes.js'
import { userRoutes } from './routes/users.js'

const router = express.Router()

router.use(flash())

// Set account locals
router.all('*', (req, res, next) => {
  const { account } = req.session.data

  // Set state
  if (account) {
    res.locals.isAdmin = account.role === 'admin'
    res.locals.isCoordinator = account.role === 'coordinator'
    res.locals.userOrganisationPath = `/organisations/${account.organisationId}`

    // TODO: Better way of determining owning organisation
    res.locals.isOwningOrg = account.organisationId === 'PARENT1'
  }

  // Provide current path
  res.locals.path = req.path

  next()
})

// Set organisation locals
router.all([
  '/organisations/:organisationId',
  '/organisations/:organisationId/*'
], (req, res, next) => {
  const { organisations } = req.session.data
  const { organisationId } = req.params

  res.locals.thisOrganisation = organisations[organisationId]
  res.locals.thisOrganisationPath = `/organisations/${organisationId}`

  next()
})

accountRoutes(router)
logRoutes(router)
schemeRoutes(router)
userRoutes(router)
organisationRoutes(router) // Must come after log, scheme and user routes

export default router
