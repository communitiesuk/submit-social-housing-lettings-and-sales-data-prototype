import { wizard } from 'govuk-prototype-rig'
import * as utils from '../utils.js'
import localAuthorities from '../datasets/local-authorities.js'

const getSchemePaths = (req) => {
  const { schemeId } = req.params
  const schemePath = `/schemes/${schemeId}/`

  const journey = {
    [`${schemePath}details`]: {},
    [`${schemePath}primary-client-group`]: {},
    [`${schemePath}secondary-client-group`]: {},
    [`${schemePath}support`]: {},
    [`${schemePath}location/l1`]: {},
    [`${schemePath}check-your-answers`]: {}
  }
  return wizard(journey, req)
}

export const schemeRoutes = (router) => {
  /**
   * List all schemes (admin only)
   */
  router.get('/schemes', (req, res, next) => {
    if (!res.locals.isAdmin) {
      return res.redirect(`${res.locals.userOrganisationPath}/schemes`)
    }

    next()
  })

  /**
   * List schemes
   */
  router.all(['/schemes', '/organisations/:organisationId/schemes'], (req, res) => {
    let { organisations, schemes } = req.session.data
    const { organisationId } = req.params || 'PARENT1'
    const organisation = organisations[organisationId]

    // Get schemes as array sorted by scheme name
    schemes = utils.objectToArray(schemes)
    schemes = utils.sortArray(schemes, 'name')

    // Scope schemes to organisation
    if (organisationId) {
      const organisationRelationships = [
        organisationId,
        ...(organisation.children ? organisation.children : [])
      ]

      // Only return users with a relationship with organisation
      schemes = schemes.filter(user => organisationRelationships
        .includes(user.organisationId)
      )
    }

    // Pagination
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit
    const results = schemes.slice(skip, skip + limit)
    const pagination = utils.getPaginationItems(
      page,
      limit,
      schemes.length
    )

    // Search query
    const q = req.query.q || req.body.q

    res.render('schemes/index', {
      query: req.query,
      q,
      organisation,
      organisations,
      results,
      pagination
    })
  })

  /**
   * Scheme
   */
  router.all('/schemes/:schemeId/:view?/:itemId?', (req, res, next) => {
    res.locals.paths = getSchemePaths(req)
    next()
  })

  /**
   * Create location
   */
  router.get('/schemes/:schemeId/location/new', (req, res) => {
    const { schemes } = req.session.data
    const { schemeId } = req.params

    const scheme = utils.getEntityById(schemes, schemeId)
    const schemePath = `/schemes/${schemeId}`

    const schemeLocationCount = Object.entries(scheme.locations).length
    const nextItemId = `l${schemeLocationCount + 1}`

    res.redirect(`${schemePath}/location/${nextItemId}`)
  })

  /**
   * Update location
   */
  router.post('/schemes/:schemeId/location/:itemId/update', (req, res) => {
    const { schemeId, itemId } = req.params
    const schemePath = `/schemes/${schemeId}`

    res.redirect(`${schemePath}/locations?success=updated-location&itemId=${itemId}`)
  })

  /**
   * Confirm delete location
   */
  router.get('/schemes/:schemeId/location/:itemId/delete', (req, res) => {
    const { schemes } = req.session.data
    const { schemeId, itemId } = req.params

    const scheme = utils.getEntityById(schemes, schemeId)
    const location = schemes[schemeId].locations[itemId]
    const locationsPath = `/schemes/${schemeId}/locations`

    res.render('schemes/delete-location', {
      scheme,
      location,
      locationsPath
    })
  })

  /**
   * Delete location
   */
  router.post('/schemes/:schemeId/location/:itemId/delete', (req, res) => {
    const { schemes } = req.session.data
    const { schemeId, itemId } = req.params

    delete schemes[schemeId].locations[itemId]

    res.redirect(`/schemes/${schemeId}/locations?success=deleted`)
  })

  /**
   * Create scheme
   */
  router.get('/schemes/new', (req, res) => {
    const { account, schemes } = req.session.data
    const schemeId = utils.generateUniqueId()

    // Create a new blank scheme in session data
    // Assign to user’s organisation (only DC at owning organisation can create)
    schemes[schemeId] = {
      created: new Date().toISOString(),
      draft: true,
      organisationId: account.organisationId
    }

    res.redirect(`/schemes/${schemeId}/details`)
  })

  /**
   * View scheme
   */
  router.get('/schemes/:schemeId/:view?/:itemId?', (req, res) => {
    const { organisations, schemes } = req.session.data
    const { itemId, schemeId } = req.params
    const view = req.params.view ? req.params.view : 'scheme'

    const scheme = utils.getEntityById(schemes, schemeId)
    const schemePath = `/schemes/${schemeId}`

    // Get organisation that owns scheme
    const organisationId = scheme.organisationId
    const organisation = utils.getEntityById(organisations, organisationId)

    // Admin can add schemes to any organisation
    const allOrganisations = utils.objectToArray(organisations)

    // Data coordinators can add schemes to own organisation and its children
    const managedOrganisations = [organisation].concat(
      allOrganisations.filter(organisation => {
        if (organisation.parents) {
          return organisation.parents.includes(organisationId)
        }

        return false
      })
    )

    if (scheme) {
      res.render(`schemes/${view}`, {
        query: req.query,
        localAuthorities,
        organisations,
        allOrganisations,
        managedOrganisations,
        organisation,
        organisationId,
        itemId,
        scheme,
        schemes,
        schemePath
      })
    } else {
      res.redirect('/schemes')
    }
  })

  /**
   * Delete scheme
   */
  router.post('/schemes/:schemeId/delete', (req, res) => {
    const { account, schemes } = req.session.data
    const { schemeId } = req.params

    delete schemes[schemeId]

    res.redirect(`/organisations/${account.organisationId}/schemes?success=deleted`)
  })

  /**
   * Update scheme
   */
  router.post('/schemes/:schemeId/:view?', (req, res) => {
    const { schemes } = req.session.data
    const { schemeId, view } = req.params
    const schemePath = `/schemes/${schemeId}`

    // Add another location
    if (req.body['add-another-location'] === 'true') {
      const itemId = req.body['next-item-id']
      res.locals.paths.next = `${schemePath}/location/${itemId}`
    }

    // Confirm scheme
    if (view === 'check-your-answers') {
      delete schemes[schemeId].draft
      res.locals.paths.next = `${schemePath}?success=created`
    }

    // Confirm scheme updates
    if (view === 'check-updated-answers') {
      res.locals.paths.next = `${schemePath}/update`
    }

    // Update scheme
    if (view === 'update') {
      res.locals.paths.next = `${schemePath}?success=updated`
    }

    // Deactivate scheme
    if (view === 'deactivate') {
      schemes[schemeId].deactivated = true
      res.locals.paths.next = `${schemePath}?success=deactivated`
    }

    // Reactivate scheme
    if (view === 'reactivate') {
      schemes[schemeId].deactivated = false
      res.locals.paths.next = `${schemePath}?success=reactivated`
    }

    const next = res.locals.paths.next && res.locals.paths.next !== ''
      ? res.locals.paths.next
      : `/schemes/${req.params.schemeId}/check-your-answers`

    res.redirect(next)
  })
}
