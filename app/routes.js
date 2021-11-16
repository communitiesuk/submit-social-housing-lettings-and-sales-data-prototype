import express from 'express'
import { accountRoutes } from './routes/account.js'
import { logRoutes } from './routes/logs.js'
import { organisationRoutes } from './routes/organisations.js'
import { userRoutes } from './routes/users.js'

const router = express.Router()

router.all('*', (req, res, next) => {
  const { data } = req.session

  // Set state
  if (data && data.account) {
    res.locals.isAdmin = data.account.role === 'admin'
    res.locals.isCoordinator = data.account.role === 'coordinator'
  }

  // Set active section
  if (req.path.startsWith('/account')) {
    res.locals.activeSection = 'account'
  } else if (req.path.startsWith('/organisations')) {
    res.locals.activeSection = 'organisations'
  } else if (req.path.startsWith('/users')) {
    res.locals.activeSection = 'users'
  }

  next()
})

accountRoutes(router)
logRoutes(router)
userRoutes(router)
organisationRoutes(router)

export default router
