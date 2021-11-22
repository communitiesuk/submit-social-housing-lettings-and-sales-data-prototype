import organisations from '../../data/organisations.js'
import * as utils from '../../utils.js'

// Convert organisations to array
const allOrganisations = utils.objectToArray(organisations)

// Only show organisations that a user has a relationship with
// TODO: Get this array from session data
const userOrganisations = ['PARENT1', 'CHILD1', 'CHILD2']

const availableOrganisations = allOrganisations
  .filter(org => userOrganisations.includes(org.id))

const owningOrganisations = availableOrganisations
  .filter(org => org.stock)

export default {
  all: allOrganisations,
  owning: owningOrganisations,
  managing: availableOrganisations
}
