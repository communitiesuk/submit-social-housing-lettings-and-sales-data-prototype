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
  delete req.session.data.account

  res.redirect('/')
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
    const section = utils.getById(sections, sectionId)
    const sectionPath = `/logs/${logId}/${sectionId}`
    const sectionFirstPath = section.paths(sectionPath, log)[0]

    if (log[sectionId]) {
      res.redirect(`${sectionPath}/check-your-answers`)
    } else {
      res.redirect(`${sectionFirstPath}`)
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

    const log = utils.getEntryById(logs, logId)
    const logPath = `/logs/${logId}`
    const section = utils.getById(sections, sectionId)
    const sectionPath = `/logs/${logId}/${sectionId}`
    const sectionKeyPath = `logs[${logId}][${sectionId}]`

    // Fork if next path is a fork
    const fork = section.forks
      ? utils.nextForkPath(section.forks(sectionPath, sectionKeyPath), req)
      : false

    // Calculate back and next paths
    const paths = section.paths
      ? utils.nextAndBackPaths(section.paths(sectionPath, log), req)
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
        res.render(`logs/${sectionId}/${view}`, renderOptions)
      }
    } else {
      res.render(`logs/${sectionId}/${view}`, renderOptions)
    }
  } catch (error) {
    next(error)
  }
})

export default router
