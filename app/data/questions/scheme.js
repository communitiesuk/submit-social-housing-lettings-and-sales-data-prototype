import { createRequire } from 'node:module'
import clientGroups from './client-groups.js'

const require = createRequire(import.meta.url)
const schemes = require('../../datasets/generated/schemes.json')

const _getClientGroups = (groups) => {
  if (Array.isArray(clientGroups)) {
    const items = []
    groups.forEach(item => {
      item = String(item)
      const question = clientGroups.find(question => question.value === item)
      const text = question ? question.text : item
      items.push(text)
    })
    return items.join(', ')
  }
}

// Convert schemes to array
const schemeItems = []

Object.entries(schemes).forEach(([key, value]) => {
  schemeItems.push({
    text: value.name,
    value: value.id,
    hint: {
      text: `${value.postcode}, ${value['local-authority'].name}`
    },
    attributes: {
      'data-append': value.postcode,
      'data-hint': _getClientGroups(value['client-groups']),
      'data-synonyms': value.postcode
    }
  })
})

export default schemeItems
