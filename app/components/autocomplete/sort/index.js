import clean from './clean.js'
import stopWords from './stop-words.js'
import calculateWeight from './calculate-weight.js'

const addWeightWithBoost = (option, query) => {
  option.weight = calculateWeight(option.clean, query) * option.clean.boost

  return option
}

const cleanseOption = (option) => {
  const synonyms = (option.synonyms || []).map(clean)

  option.clean = {
    name: clean(option.name),
    nameWithoutStopWords: stopWords(option.name),
    synonyms,
    synonymsWithoutStopWords: synonyms.map(stopWords),
    boost: (option.boost || 1)
  }

  return option
}

const hasWeight = (option) => (option.weight > 0)

const byWeightThenAlphabetically = (a, b) => {
  if (a.weight > b.weight) return -1
  if (a.weight < b.weight) return 1
  if (a.name < b.name) return -1
  if (a.name > b.name) return 1

  return 0
}

const optionName = (option) => option.name

export {
  addWeightWithBoost,
  cleanseOption,
  hasWeight,
  byWeightThenAlphabetically,
  optionName
}

export default (query, options) => {
  const cleanQuery = clean(query)

  return options.map(cleanseOption)
    .map((option) => addWeightWithBoost(option, cleanQuery))
    .filter(hasWeight)
    .sort(byWeightThenAlphabetically)
    .map(optionName)
}
