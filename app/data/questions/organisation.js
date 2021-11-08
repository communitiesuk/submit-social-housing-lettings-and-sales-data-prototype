import organisations from '../../data/organisations.js'
import * as utils from '../../utils.js'

// Convert array for govukSelect `items` param
function _getItems (array) {
  const options = array
    .sort((a, b) => {
      const fa = a.name.toLowerCase()
      const fb = b.name.toLowerCase()

      if (fa < fb) { return -1 }
      if (fa > fb) { return 1 }
      return 0
    })
    .map(org => ({ text: org.name, value: org.id }))

  options.unshift({
    value: null,
    text: 'Select…'
  })

  return options
}

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
  all: _getItems(allOrganisations),
  owning: _getItems(owningOrganisations),
  managing: _getItems(availableOrganisations)
}
