import { wizard } from 'govuk-prototype-rig'
import { sections as getSections } from '../data/sections.js'
import * as utils from '../utils.js'

export const logRoutes = (router) => {
  /**
   * List logs
   */
  router.get(['/logs', '/organisations/:organisationId/logs'], (req, res) => {
    let { logs, users } = req.session.data
    const type = req.query.type || 'lettings'

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
      users
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
      created: new Date().toISOString(),
      createdBy: account,
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
   * Confirm changing answer that has dependency
   */
  router.get('/logs/:logId/confirm-change-answer', (req, res, next) => {
    res.render('logs/confirm-change-answer')
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

      return res.redirect(`/logs/?success=submitted&logId=${logId}`)
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
   * Log section
   */
  router.all('/logs/:logId/:sectionId/:itemId?/:view?', (req, res, next) => {
    const { logId, sectionId } = req.params
    const { logs } = req.session.data

    const log = utils.getEntityById(logs, logId)
    const section = utils.getById(getSections(log), sectionId)

    res.locals.paths = wizard(section.paths, req)

    next()
  })

  /**
   * View log section
   */
  router.get('/logs/:logId/:sectionId', (req, res, next) => {
    try {
      const { logId, sectionId } = req.params
      const { logs } = req.session.data

      const log = utils.getEntityById(logs, logId)
      const section = utils.getById(getSections(log), sectionId)

      if (log[sectionId]) {
        if (sectionId === 'submit') {
          res.redirect(`/logs/${logId}/submit/confirm`)
        } else {
          res.redirect(`/logs/${logId}/${sectionId}/check-your-answers`)
        }
      } else {
        const firstQuestion = Object.keys(section.paths)[0]
        res.redirect(firstQuestion)
      }
    } catch (error) {
      next(error)
    }
  })

  /**
   * Log section question
   */
  router.get('/logs/:logId/:sectionId/:itemId?/:view?', async (req, res, next) => {
    try {
      let { logId, sectionId, itemId, view } = req.params
      const { account, logs, organisations } = req.session.data

      // If there’s no :view param, use :itemId param for view
      if (!view) {
        view = itemId
      }

      const log = utils.getEntityById(logs, logId)
      const logPath = `/logs/${logId}`
      const section = utils.getById(getSections(log), sectionId)
      const sectionPath = `/logs/${logId}/${sectionId}`

      // Organisation data
      const organisationId = account?.organisationId || 'LH3904'
      const organisation = utils.getEntityById(organisations, organisationId)
      const childOrganisations = organisation.children || []
      const userOrganisations = organisationId.concat(childOrganisations)

      const managingOrganisations = Object.values(organisations)
        .filter(org => userOrganisations.includes(org.id))

      const owningOrganisations = managingOrganisations
        .filter(org => org.stock)

      res.render(`logs/${sectionId}/${view}`, {
        caption: section.title,
        log,
        logPath,
        section,
        sectionPath,
        itemId,
        organisationId,
        managingOrganisations,
        owningOrganisations
      })
    } catch (error) {
      console.error(error)
      next(error)
    }
  })

  /**
   * Update log section question
   */
  router.post('/logs/:logId/:sectionId/:itemId?/:view?', (req, res) => {
    const { logId, sectionId } = req.params

    // If next is empty, reached last path so redirect to check your answers
    const sectionPath = `/logs/${logId}/${sectionId}`
    const next = res.locals.paths.next !== ''
      ? res.locals.paths.next
      : `${sectionPath}/check-your-answers`

    res.redirect(next)
  })
}
