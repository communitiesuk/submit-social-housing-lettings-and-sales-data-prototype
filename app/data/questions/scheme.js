import schemes from '../schemes.js'
import clientGroups from './client-groups.js'
import * as utils from '../../utils.js'

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
let allSchemes = utils.objectToArray(schemes)

allSchemes = allSchemes.map(scheme => {
  const clientGroups = _getClientGroups(scheme['client-groups'])
  scheme.hint = `${scheme.postcode}<br>${clientGroups}`
  return scheme
})

export default allSchemes
