import { createRequire } from 'node:module'

const require = createRequire(import.meta.url)
const organisations = require('../../datasets/generated/organisations.json')

// Only show organisations that a user has a relationship with
// TODO: Get this array from session data
const userOrganisations = ['LH3904', 'CHILD1', 'CHILD2']

const availableOrganisations = Object.values(organisations)
  .filter(org => userOrganisations.includes(org.id))

const owningOrganisations = availableOrganisations
  .filter(org => org.stock)

export default {
  all: organisations,
  owning: owningOrganisations,
  managing: availableOrganisations
}
