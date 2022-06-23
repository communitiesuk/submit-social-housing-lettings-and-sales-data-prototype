import { createRequire } from 'node:module'
import clientGroups from './client-groups.js'

const require = createRequire(import.meta.url)
const schemes = require('../../data/generated/schemes.json')

const _getClientGroups = (data) => {
  const primaryClientGroup = clientGroups.find(question => question.value === data['primary-client-group']).text

  if (data['secondary-client-group'] !== 'false') {
    const secondaryClientGroup = clientGroups.find(question => question.value === data['secondary-client-group']).text

    return `${primaryClientGroup}<br>${secondaryClientGroup}`
  }

  return primaryClientGroup
}

// Convert schemes to array
const schemeItems = []

Object.entries(schemes).forEach(([key, value]) => {
  // Show number of locations postcode as hint text
  const schemeLocationCount = Object.entries(value.locations).length
  const hintText = schemeLocationCount > 1
    ? `${schemeLocationCount} locations`
    : `${value.locations.l1.address}`

  // Add postcodes to search synonyms
  const synonyms = []
  Object.values(value.locations).map(location => {
    return synonyms.push(location.postcode)
  })

  schemeItems.push({
    text: value.name,
    value: value.id,
    hint: {
      text: hintText
    },
    attributes: {
      'data-append': hintText,
      'data-hint': _getClientGroups(value),
      'data-synonyms': synonyms
    }
  })
})

export default schemeItems
