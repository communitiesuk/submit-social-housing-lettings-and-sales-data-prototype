import express from 'express'
import { accountRoutes } from './routes/account.js'
import { logRoutes } from './routes/logs.js'
import { usersRoutes } from './routes/users.js'

const router = express.Router()

accountRoutes(router)
logRoutes(router)
usersRoutes(router)

export default router
