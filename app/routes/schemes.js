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
    const { organisationId } = req.params

    // Get schemes as array sorted by scheme name
    schemes = utils.objectToArray(schemes)
    schemes = utils.sortArray(schemes, 'name')

    // Scope schemes to organisation
    if (organisationId) {
      const organisation = organisations[organisationId]
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

    res.render('schemes/index', {
      query: req.query,
      organisations,
      results,
      pagination
    })
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
      organisationId: account.organisationId
    }

    res.redirect(`/schemes/${schemeId}/details`)
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
   * View updated scheme
   */
  router.all('/schemes/:schemeId/update-your-answers', (req, res) => {
    const { organisations, schemes } = req.session.data
    const { schemeId } = req.params
    const scheme = utils.getEntityById(schemes, schemeId)
    const schemePath = `/schemes/${schemeId}`

    res.render('schemes/check-your-answers', {
      organisations,
      scheme,
      schemePath,
      updateAnswers: true
    })
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
    const { schemes } = req.session.data
    const { schemeId } = req.params

    delete schemes[schemeId]

    res.redirect(`/schemes?success=deleted&schemeId=${schemeId}`)
  })

  /**
   * Update scheme
   */
  router.post('/schemes/:schemeId/:view?', (req, res) => {
    const next = res.locals.paths.next && res.locals.paths.next !== ''
      ? res.locals.paths.next
      : `/schemes/${req.params.schemeId}/check-your-answers`

    res.redirect(next)
  })
}
