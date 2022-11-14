import { wizard } from 'govuk-prototype-rig'
import { sections as getSections } from '../data/sections.js'
import { organisationSettings as getOrganisationSettings } from '../data/organisation-settings.js'
import * as utils from '../utils.js'

export const logRoutes = (router) => {
  /**
   * List logs
   */
  router.get(['/logs', '/organisations/:organisationId/logs'], (req, res) => {
    let { logs, users } = req.session.data
    const { organisationId } = req.params || 'OWNER'
    const type = req.query.type || 'lettings'

    // Convert logs to array
    logs = utils.objectToArray(logs)

    // Calculate log completion
    for (const log of logs) {
      const sections = getSections(log)

      let completedSections = 0
      for (const section of sections) {
        if (log[section.id]?.completed === 'true') {
          completedSections = completedSections + 1
        }
      }

      if (completedSections === sections.length) {
        log.status = 'completed'
      }

      log.progress = `${completedSections} of ${sections.length} sections`
    }

    // Filter: updated by current user
    // const createdBy = req.session.user || req.query.user || currentUser.id
    // logs = logs.filter(log => log.createdBy === createdBy)

    // Filter: type of log
    logs.filter(log => log.type === type)

    // Filter: organisation’s logs (if scoped to organisation)
    if (organisationId && logs) {
      logs = logs.filter(log => {
        return log.setup?.agent === organisationId ||
          log.setup?.owner === organisationId
      })
    }

    // Pagination
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 25
    const results = utils.getResults(logs, page, limit)
    const pagination = utils.getPagination(logs, page, limit)

    // Search query
    const q = req.query.q || req.body.q

    res.render('logs/index', {
      query: req.query,
      q,
      type,
      results,
      pagination,
      users
    })
  })

  /**
   * Bulk upload - Instructions page
   */
  router.get('/logs/bulk-upload', (req, res) => {
    return res.render('logs/bulk-upload/instructions')
  })

  /**
   * Bulk upload - Upload file page
   */
   router.get('/logs/bulk-upload/upload-file', (req, res) => {
    return res.render('logs/bulk-upload/upload-file')
  })

  /**
   * Bulk upload - Post request uploading file
   */
   router.post('/logs/bulk-upload/upload-file', (req, res) => {
    const { file } = req.session.data
    if (file == ''){
      const errors = {
        'file': file === ""
          ? {
              msg: 'Select a CSV file',
              param: 'file'
            }
          : {}
      }
      console.log(errors)
      return res.redirect(`/logs/bulk-upload`, { errors })
    }

    return res.redirect(`/logs/bulk-upload/file-uploaded`)
  })

  /**
   * Bulk upload - Confirmation that the bulk upload file has been received
   */
  router.get('/logs/bulk-upload/file-uploaded', (req, res) => {
    return res.render('logs/bulk-upload/file-uploaded')
  })

  /**
   * Bulk upload - Error report page
   */
  router.get('/logs/bulk-upload/error-report', (req, res) => {
    const { bulkUploadErrors } = req.session.data
    return res.render('logs/bulk-upload/error-report', { bulkUploadErrors })
  })

  /**
   * Bulk upload- Check your answers page
   */
   router.get('/logs/bulk-upload/check-your-answers', (req, res) => {
    return res.render('logs/bulk-upload/check-your-answers')
  })

    /**
   * Bulk upload - Success confirmation page
   */
     router.get('/logs/bulk-upload/confirmation', (req, res) => {
      return res.render('logs/bulk-upload/success')
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
      createdBy: account?.id || 'ADMIN',
      updated: new Date().toISOString(),
      updatedBy: account?.id || 'ADMIN'
    }

    res.redirect(`/logs/${logId}/`)
  })

  /**
   * View log
   */
  router.get('/logs/:logId', (req, res) => {
    const { logId } = req.params
    const { logs } = req.session.data

    const log = utils.getFromObjectById(logs, logId)
    const sections = getSections(log)

    if (log) {
      if (log.status === 'submitted') {
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
    const log = utils.getFromObjectById(logs, logId)
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
    const log = utils.getFromObjectById(logs, logId)
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
      logs[logId].createdBy = account

      req.flash('success', `Log ${logId} has been submitted.`)
      return res.redirect('/logs/')
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
    const { account, logs, organisations } = req.session.data
    const organisationId = account?.organisationId || 'OWNER'
    const organisation = organisations[organisationId]

    const log = utils.getFromObjectById(logs, logId)
    const section = utils.getFromArrayById(getSections(log, organisation), sectionId)

    res.locals.paths = wizard(section.paths, req)

    next()
  })

  /**
   * View log section
   */
  router.get('/logs/:logId/:sectionId', (req, res, next) => {
    try {
      const { logId, sectionId } = req.params
      const { account, logs, organisations } = req.session.data
      const organisationId = account?.organisationId || 'OWNER'
      const organisation = organisations[organisationId]

      const log = utils.getFromObjectById(logs, logId)
      const section = utils.getFromArrayById(getSections(log, organisation), sectionId)

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

      const log = utils.getFromObjectById(logs, logId)
      const logPath = `/logs/${logId}`
      const section = utils.getFromArrayById(getSections(log), sectionId)
      const sectionPath = `/logs/${logId}/${sectionId}`

      // Organisation data
      const organisationId = account?.organisationId || 'OWNER'
      const organisation = utils.getFromObjectById(organisations, organisationId)

      // Add hint to your organisation in options
      organisations[organisationId].hint = 'Your organisation'

      // Get details of every organisation listed as an owner
      const owners = []
      organisation.owners.forEach(owner => owners.push(organisations[owner]))

      // If this organisation is an owner, add it to the start of the list
      if (owners.length && organisation.isOwner === 'true') {
        owners.unshift(organisation, { divider: 'or' })
      }

      // Get details of every organisation listed as an agent
      const agents = []
      organisation.agents.forEach(agent => agents.push(organisations[agent]))

      // If this organisation is an agent, add it to the start of the list
      if (agents.length && organisation.isAgent === 'true') {
        agents.unshift(organisation, { divider: 'or' })
      }

      // Get settings for this organisation (rent periods)
      const organisationSettings = getOrganisationSettings(organisation)

      res.render(`logs/${sectionId}/${view}`, {
        caption: section.title,
        log,
        logPath,
        section,
        sectionPath,
        itemId,
        organisationId,
        agents,
        owners,
        organisationSettings
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
