import { validationResult } from 'express-validator'
import { wizard } from 'govuk-prototype-rig'

import { sections as getSections } from '../data/sections.js'
import * as utils from '../utils.js'
import { validations } from '../validations.js'

export const logRoutes = (router) => {
  /**
   * List logs
   */
  router.get('/logs', (req, res) => {
    let { account, logs, users } = req.session.data
    const type = req.query.type || 'lettings'

    // Get current user
    const usersArray = utils.objectToArray(users)

    let currentUser = usersArray.find(user => user.id === 'DP001')
    if (account) {
      currentUser = usersArray.find(user => user.email === account.email)
    }

    // Convert logs to array
    logs = utils.objectToArray(logs)

    // Calculate log completion
    for (const log of logs) {
      const sections = getSections(log)

      let incompleteSections = 0
      for (const section of sections) {
        if (log[section.id]?.completed === 'true') {
          incompleteSections = incompleteSections + 1
        }
      }

      log.progress = `${incompleteSections} of ${sections.length} sections`
    }

    // Filter: updated by current user
    // const updatedBy = req.session.user || req.query.user || currentUser.id
    // logs = logs.filter(log => log.updatedBy === updatedBy)

    res.render('logs/index', {
      query: req.query,
      logs,
      type,
      users,
      currentUser
    })
  })

  /**
   * Create new log
   */
  router.post('/logs/create', (req, res) => {
    const { account, logs, type } = req.session.data
    const logId = utils.generateUniqueId()

    // Create a new blank log in session data
    logs[logId] = {
      type,
      updated: new Date().toISOString(),
      updatedBy: account
    }

    res.redirect(`/logs/${logId}/`)
  })

  /**
   * View log
   */
  router.get('/logs/:logId', (req, res) => {
    const { logId } = req.params
    const { logs } = req.session.data

    const log = utils.getEntityById(logs, logId)
    const sections = getSections(log)

    if (log) {
      if (log.status === 'archived') {
        return res.render('logs/review', { log, sections })
      }

      return res.render('logs/log', { log, sections })
    } else {
      return res.redirect('/logs')
    }
  })

  /**
   * Submit log
   */
  router.get('/logs/:logId/review', (req, res, next) => {
    const { logId } = req.params
    const { account, logs } = req.session.data
    const log = utils.getEntityById(logs, logId)
    const sections = getSections(log)

    res.render('logs/review', { account, log, logs, sections })
  })

  /**
   * Submit log
   */
  router.post('/logs/:logId/review', (req, res, next) => {
    const { logId } = req.params
    const { account, logs } = req.session.data
    const log = utils.getEntityById(logs, logId)
    const sections = getSections(log)

    const privacyNotice = logs[logId]?.['household-characteristics']?.['privacy-notice'] !== undefined
    const numberInHousehold = logs[logId]?.['household-characteristics']?.['number-in-household'] !== undefined

    if (privacyNotice && numberInHousehold) {
      // Update log with derived and meta data
      logs[logId].postcode = logs[logId]['property-information']?.postcode ||
      logs[logId]['property-information-renewal']?.postcode ||
      logs[logId]['property-information-supported-housing']?.postcode
      logs[logId].status = 'submitted'
      logs[logId].updated = new Date().toISOString()
      logs[logId].updatedBy = account

      return res.redirect(`/logs/?success=submitted-log&logId=${logId}`)
    }

    const errors = {
      'privacy-notice': !privacyNotice
        ? {
            msg: 'Select if the tenant has seen the DLUHC privacy notice',
            param: 'privacy-notice'
          }
        : {},
      'number-in-household': !numberInHousehold
        ? {
            msg: 'Enter the number of people who live in the household',
            param: 'number-in-household'
          }
        : {}
    }

    return res.render('logs/review', { account, errors, log, logs, sections })
  })

  /**
   * View log section
   */
  router.get('/logs/:logId/:sectionPathId', (req, res, next) => {
    try {
      const { logId, sectionPathId } = req.params
      const { logs } = req.session.data

      const log = utils.getEntityById(logs, logId)
      const section = utils.getByPath(getSections(log), sectionPathId)

      if (log[sectionPathId]) {
        if (sectionPathId === 'submit') {
          res.redirect(`/logs/${logId}/submit/confirm`)
        } else {
          res.redirect(`/logs/${logId}/${sectionPathId}/check-your-answers`)
        }
      } else {
        res.redirect(section.paths[0])
      }
    } catch (error) {
      next(error)
    }
  })

  /**
   * View log section question
   */
  router.all('/logs/:logId/:sectionPathId/:itemId?/:view?', async (req, res, next) => {
    try {
      let { logId, sectionPathId, itemId, view } = req.params
      const { logs } = req.session.data

      // If there’s no :view param, use :itemId param for view
      if (!view) {
        view = itemId
      }

      // Some sections have variants that share common views
      let sectionId = sectionPathId
      if (sectionPathId.startsWith('household-situation')) {
        sectionId = 'household-situation'
      }
      if (sectionId.startsWith('tenancy-information')) {
        sectionId = 'tenancy-information'
      }
      if (sectionId.startsWith('property-information')) {
        sectionId = 'property-information'
      }
      if (sectionId.startsWith('finances')) {
        sectionId = 'finances'
      }

      const log = utils.getEntityById(logs, logId)
      const logPath = `/logs/${logId}`
      const section = utils.getById(getSections(log), sectionId)
      const sectionPath = `/logs/${logId}/${sectionPathId}`

      // Fork if next path is a fork
      const sectionKeyPath = `logs[${logId}][${sectionId}]`
      const sectionForks = section?.forks
        ? section.forks(sectionPath, sectionKeyPath, req)
        : []
      const fork = sectionForks
        ? wizard.nextForkPath(sectionForks, req)
        : false

      // Calculate back and next paths
      const paths = section.paths
        ? wizard.nextAndBackPaths(section.paths, req)
        : []

      // Common render options, shared between normal and validated view
      let renderOptions = {
        caption: section.title,
        log,
        logPath,
        section,
        sectionPath,
        itemId,
        paths
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
          const next = paths.next !== ''
            ? paths.next
            : `${sectionPath}/check-your-answers`

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
}
