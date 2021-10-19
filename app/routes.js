import express from 'express'
import sections from '../app/data/sections.js'
import * as utils from './utils.js'
import { validationResult } from 'express-validator'
import { validations } from './validations.js'

const router = express.Router()

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

  res.render('logs/log', {
    log
  })
})

router.get('/logs/:logId/:sectionId', (req, res) => {
  const { logId, sectionId } = req.params
  const { logs } = req.session.data

  const log = utils.getEntryById(logs, logId)
  const section = utils.getById(sections, sectionId)
  const sectionRoot = `/logs/${logId}/${sectionId}`
  const sectionFirstPath = section.paths(sectionRoot, log)[0]

  if (log[sectionId]?.completed === 'true') {
    res.redirect(`${sectionRoot}/check-answers`)
  } else {
    res.redirect(`${sectionFirstPath}`)
  }
})

router.all('/logs/:logId/:sectionId/:view?', async (req, res) => {
  console.log('from router')
  const { logId, sectionId, view } = req.params
  const { referrer } = req.query
  const { logs } = req.session.data

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
      fork ? res.redirect(fork) : res.redirect(paths.next)
    } else {
      renderOptions = { ...renderOptions, ...{ errors: errors.mapped() } }
      res.render(`logs/${sectionId}/${view}`, renderOptions)
    }
  } else {
    res.render(`logs/${sectionId}/${view}`, renderOptions)
  }
})

export default router
