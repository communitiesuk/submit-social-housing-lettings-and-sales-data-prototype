import { wizard } from 'govuk-prototype-rig'
import * as utils from '../utils.js'
import localAuthorities from '../datasets/local-authorities.js'

const getSchemePaths = (req) => {
  const { schemeId } = req.params
  const schemePath = `/schemes/${schemeId}/`

  const journey = {
    [`${schemePath}details`]: {},
    [`${schemePath}postcode`]: {
      [`${schemePath}local-authority`]: {
        data: `schemes.${schemeId}['postcode-known']`,
        value: 'false'
      }
    },
    [`${schemePath}client-groups`]: {},
    [`${schemePath}type-of-registered-home`]: {},
    [`${schemePath}type-of-support`]: {},
    [`${schemePath}intended-stay`]: {},
    [`${schemePath}type-of-unit`]: {},
    [`${schemePath}units`]: {},
    [`${schemePath}type-of-building`]: {},
    [`${schemePath}is-adapted`]: {},
    [`${schemePath}dates`]: {},
    [`${schemePath}check-your-answers`]: {}
  }
  return wizard(journey, req)
}

const getSortedSchemes = (schemes) => {
  return utils.objectToArray(schemes).sort((a, b) => {
    // If name not provided, don’t sort
    if (!a.name || !b.name) {
      return 0
    }

    const fa = a.name.toLowerCase()
    const fb = b.name.toLowerCase()

    if (fa < fb) { return -1 }
    if (fa > fb) { return 1 }
    return 0
  })
}

export const schemeRoutes = (router) => {
  /**
   * List schemes
   */
  router.all('/organisations/:organisationId/schemes', (req, res) => {
    let { organisations, schemes } = req.session.data
    const { organisationId } = req.params

    // If path is scoped to organisation, only show schemes in that organisation
    // or any of its children
    let organisation
    let organisationPath = ''
    if (organisationId) {
      organisation = utils.getEntityById(organisations, organisationId)
      organisationPath = `/organisations/${organisationId}`

      const organisationRelationships = [
        organisationId,
        ...(organisation.children ? organisation.children : [])
      ]

      // Filter schemes by current organisation
      schemes = getSortedSchemes(schemes)
      schemes = schemes.filter(scheme =>
        organisationRelationships.includes(scheme.organisationId)
      )
    }

    // Pagination
    const page = parseInt(req.query.page) || 1
    const limit = parseInt(req.query.limit) || 20
    const skip = (page - 1) * limit
    const results = schemes.slice(skip, skip + limit)

    res.render('schemes/index', {
      query: req.query,
      organisation,
      organisationPath,
      schemes,
      page,
      limit,
      skip,
      results
    })
  })

  /**
   * Create scheme
   */
  router.get('/schemes/new', (req, res) => {
    const { schemes } = req.session.data
    const schemeId = utils.generateUniqueId()

    // Create a new blank scheme in session data
    schemes[schemeId] = {}

    res.redirect(`/schemes/${schemeId}/details`)
  })

  /**
   * Scheme
   */
  router.all('/schemes/:schemeId/:view?', (req, res, next) => {
    res.locals.paths = getSchemePaths(req)
    next()
  })

  /**
   * View scheme
   */
  router.get('/schemes/:schemeId/:view?', (req, res) => {
    const { account, organisations, schemes } = req.session.data
    const { schemeId } = req.params
    const view = req.params.view ? req.params.view : 'scheme'

    const scheme = utils.getEntityById(schemes, schemeId)
    const schemePath = `/schemes/${schemeId}`

    const organisationId = account?.organisationId || 'LH3904'
    const organisation = utils.getEntityById(organisations, organisationId)
    const organisationPath = `/organisations/${organisationId}`

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
        allOrganisations,
        managedOrganisations,
        organisation,
        organisationId,
        organisationPath,
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

    res.redirect('/schemes?success=deleted')
  })

  /**
   * Update scheme
   */
  router.post('/schemes/:schemeId/:view?', (req, res) => {
    res.redirect(res.locals.paths.next)
  })
}
