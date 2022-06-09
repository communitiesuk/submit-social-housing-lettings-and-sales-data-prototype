import { wizard } from 'govuk-prototype-rig'
import * as utils from '../utils.js'
import { organisationSettings as getOrganisationSettings } from '../data/organisation-settings.js'

const getOrganisationWizardPaths = (req) => {
  const { organisationId } = req.params
  const organisationPath = `/organisations/${organisationId}/`

  const journey = {
    [`${organisationPath}details`]: {},
    [`${organisationPath}is-owner`]: {
      // SKIP: Can’t have agents if doesn’t own stock
      [`${organisationPath}is-agent`]: {
        data: `organisations.${organisationId}.isOwner`,
        value: 'false'
      }
    },
    [`${organisationPath}is-owner-agent`]: {
      // SKIP: Don’t need agents if manages own stock
      [`${organisationPath}is-agent`]: {
        data: `organisations.${organisationId}.isOwnerAgent`,
        value: 'true'
      }
    },
    [`${organisationPath}agents`]: {},
    [`${organisationPath}is-agent`]: {
      // SKIP: Don’t need rent periods if doesn’t manage properties
      [`${organisationPath}check-your-answers`]: {
        data: `organisations.${organisationId}.isAgent`,
        value: 'false'
      }
    },
    [`${organisationPath}owners`]: {},
    [`${organisationPath}rent-periods`]: {},
    [`${organisationPath}check-your-answers`]: {}
  }
  return wizard(journey, req)
}

export const organisationRoutes = (router) => {
  /**
   * List organisations (admins only)
   */
  router.all('/organisations', (req, res) => {
    let { organisations } = req.session.data

    organisations = utils.objectToArray(organisations)

    // Pagination
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 100
    const skip = (page - 1) * limit
    const results = organisations.slice(skip, skip + limit)
    const pagination = utils.getPaginationItems(
      page,
      limit,
      organisations.length
    )

    // Search query
    const q = req.query.q || req.body.q

    res.render('organisations/index', {
      query: req.query,
      q,
      results,
      pagination
    })
  })

  /**
   * Organisation
   */
  router.all('/organisations/:organisationId/:view?', (req, res, next) => {
    res.locals.paths = getOrganisationWizardPaths(req)
    next()
  })

  /**
   * Create organisation
   */
  router.get('/organisations/new', (req, res) => {
    const { organisations } = req.session.data
    const organisationId = utils.generateUniqueId()

    organisations[organisationId] = {
      id: organisationId,
      created: new Date().toISOString(),
      draft: 'true'
    }

    res.redirect(`/organisations/${organisationId}/details`)
  })

  /**
   * View organisation
   */
  router.get('/organisations/:organisationId/:view?', (req, res) => {
    const { organisations } = req.session.data
    const { organisationId } = req.params
    const view = req.params.view ? req.params.view : 'organisation'

    const organisation = organisations[organisationId]
    const organisationPath = `/organisations/${organisationId}`
    const organisationSettings = getOrganisationSettings(organisation)

    if (organisation) {
      res.render(`organisations/${view}`, {
        query: req.query,
        organisation,
        organisationPath,
        organisationSettings,
        organisations
      })
    } else {
      res.redirect('/organisations')
    }
  })

  /**
   * Update organisation
   */
  router.post('/organisations/:organisationId/:view?', (req, res) => {
    const { organisations } = req.session.data
    const { organisationId } = req.params
    const view = req.params.view ? req.params.view : 'organisation'
    const organisationPath = `/organisations/${organisationId}`

    // Confirm organisation
    if (view === 'check-your-answers') {
      res.locals.paths.next = `${organisationPath}?success=created`
    }

    // Confirm scheme updates
    if (view === 'check-updated-answers') {
      delete organisations[organisationId].draft
      res.locals.paths.next = `${organisationPath}/update`
    }

    // Update organisation
    if (view === 'update') {
      res.locals.paths.next = `${organisationPath}?success=updated`
    }

    // Deactivate user
    if (view === 'deactivate') {
      organisations[organisationId].deactivated = true
      res.locals.paths.next = `${organisationPath}?success=deactivated`
    }

    // Reactivate user
    if (view === 'reactivate') {
      organisations[organisationId].deactivated = false
      res.locals.paths.next = `${organisationPath}?success=reactivated`
    }

    res.redirect(res.locals.paths.next)
  })
}
