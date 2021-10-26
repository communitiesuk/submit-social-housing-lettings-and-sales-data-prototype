import express from 'express'
import sections from '../app/data/sections.js'
import * as utils from './utils.js'
import { validationResult } from 'express-validator'
import { validations } from './validations.js'

const router = express.Router()

/**
 * Account
 */
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

/**
 * Users
 */
router.all('/users', (req, res) => {
  const { account, users } = req.session.data
  const { referrer, success, userId } = req.query

  res.render('users/index', { account, referrer, success, userId, users })
})

router.get('/users/new', (req, res) => {
  const { users } = req.session.data
  const userId = utils.generateLogId()

  // Create a new blank log in session data
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

/**
 * Logs
 */
router.get('/logs/new', (req, res) => {
  const { logs } = req.session.data
  const logId = utils.generateLogId()

  // Create a new blank log in session data
  logs[logId] = {
    updated: new Date().toISOString()
  }

  res.redirect(`/logs/${logId}/about-this-log`)
})

router.get('/logs/:logId', (req, res) => {
  const { logId } = req.params
  const { logs } = req.session.data

  const log = utils.getEntryById(logs, logId)

  if (log) {
    res.render('logs/log', { log })
  } else {
    res.redirect('/logs')
  }
})

router.get('/logs/:logId/:sectionId', (req, res, next) => {
  try {
    const { logId, sectionId } = req.params
    const { logs } = req.session.data

    const log = utils.getEntryById(logs, logId)
    const section = utils.getById(sections(log), sectionId)

    if (log[sectionId]) {
      res.redirect(`/logs/${logId}/${sectionId}/check-your-answers`)
    } else {
      res.redirect(section.paths[0])
    }
  } catch (error) {
    next(error)
  }
})

router.all('/logs/:logId/:sectionId/:view?', async (req, res, next) => {
  try {
    const { logId, sectionId, view } = req.params
    const { logs } = req.session.data
    let { referrer } = req.query

    // Property information section variants share the same views
    let sectionViewsDir = sectionId
    if (sectionId.startsWith('property-information')) {
      sectionViewsDir = 'property-information'
    }

    const log = utils.getEntryById(logs, logId)
    const logPath = `/logs/${logId}`
    const section = utils.getById(sections(log), sectionId)
    const sectionPath = `/logs/${logId}/${sectionId}`
    const sectionKeyPath = `logs[${logId}][${sectionId}]`

    // Fork if next path is a fork
    const fork = section.forks
      ? utils.nextForkPath(section.forks(sectionPath, sectionKeyPath), req)
      : false

    // Calculate back and next paths
    const paths = section.paths
      ? utils.nextAndBackPaths(section.paths, req)
      : []

    // For check your answers page, the referrer is always that page
    if (view === 'check-your-answers') {
      referrer = req.path
    }

    // Common render options, shared between normal and validated view
    let renderOptions = {
      caption: section.title,
      log,
      logPath,
      section,
      sectionPath,
      paths,
      referrer
    }

    if (req.method === 'POST') {
      // Check if any fields on the page require validation
      const fieldsToValidate = validations(req).logs[sectionId]?.[view]
      if (fieldsToValidate) {
        await Promise.all(fieldsToValidate.map(validation => validation.run(req)))
      }

      // Check if we have any validation errors
      const errors = validationResult(req)
      if (errors.isEmpty()) {
        // If next path is empty, this is the last path so redirect to check answers page
        const next = paths.next !== '' ? paths.next : `${sectionPath}/check-your-answers`

        fork ? res.redirect(fork) : res.redirect(next)
      } else {
        renderOptions = { ...renderOptions, ...{ errors: errors.mapped() } }
        res.render(`logs/${sectionViewsDir}/${view}`, renderOptions)
      }
    } else {
      res.render(`logs/${sectionViewsDir}/${view}`, renderOptions)
    }
  } catch (error) {
    next(error)
  }
})

export default router
