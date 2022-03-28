import * as utils from '../utils.js'
import localAuthorities from '../datasets/local-authorities.js'

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

    res.render('organisations/index', {
      query: req.query,
      results,
      pagination
    })
  })

  /**
   * TODO: Create organisation
   */
  router.get('/organisations/new', (req, res) => {
    const { organisations } = req.session.data
    const organisationId = utils.generateUniqueId()

    // Create a new blank organisation in session data
    organisations[organisationId] = {}

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

    if (organisation) {
      res.render(`organisations/${view}`, {
        query: req.query,
        localAuthorities,
        organisation,
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
    const { organisationId, view } = req.params

    // Deactivate user
    if (view === 'deactivate') {
      organisations[organisationId].deactivated = true
    }

    // Reactivate user
    if (view === 'reactivate') {
      organisations[organisationId].deactivated = false
    }

    res.redirect(res.locals.thisOrganisationPath)
  })
}
