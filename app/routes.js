import express from 'express'
import validator from 'express-validator'
import * as validations from './validations.js'
import { getById, getEntryById } from './utils.js'

const router = express.Router()

/**
 * Logs
 */
router.get('/logs/:logId', (req, res) => {
  const { logId } = req.params
  const { logs } = req.session.data

  const log = getEntryById(logs, logId)

  res.render('logs/log', {
    log
  })
})

router.get('/logs/:logId/:sectionId', (req, res) => {
  const { logId, sectionId } = req.params
  const { logs, sections } = req.session.data

  const log = getEntryById(logs, logId)
  const section = getById(sections, sectionId)

  if (log[sectionId]?.completed === 'true') {
    res.redirect(`/logs/${logId}/${sectionId}/check-answers`)
  } else {
    res.redirect(`/logs/${logId}/${sectionId}/${section.firstQuestion}`)
  }
})

router.get('/logs/:logId/:sectionId/:view?', (req, res) => {
  const { logId, sectionId, view } = req.params
  const { referrer } = req.query
  const { logs, sections } = req.session.data

  const log = getEntryById(logs, logId)
  const section = getById(sections, sectionId)

  res.render(`logs/${sectionId}/${view}`, {
    caption: section.title,
    log,
    logPath: `/logs/${log.id}`,
    section,
    sectionPath: `/logs/${log.id}/${section.id}`,
    referrer
  })
})

/**
 * Example route which validates a form submission
 */
router.post('/examples/validation-errors', validations.exampleValidation, (req, res) => {
  const errors = validator.validationResult(req)
  res.render('examples/validation-errors', {
    errors: errors.isEmpty() ? false : errors.mapped()
  })
})

export default router
