import accessibleAutocomplete from 'accessible-autocomplete'
import sort from './sort/index.js'

const suggestion = (value, options) => {
  const option = options.find(option => option.name === value)
  if (option) {
    const html = option.append
      ? `<strong>${value}</strong> ${option.append}`
      : value
    return option.hint
      ? `${html}<br><span class="autocomplete__option__hint">${option.hint}</span>`
      : html
  } else {
    return 'No results found'
  }
}

const enhanceOption = (option) => {
  return {
    name: option.label,
    synonyms: (option.dataset.synonyms
      ? option.dataset.synonyms.split('|')
      : []
    ),
    append: option.dataset.append,
    hint: option.dataset.hint,
    boost: (parseFloat(option.dataset.boost) || 1)
  }
}

export const setupAutoComplete = (element) => {
  const selectOptions = Array.from(element.options)
  const options = selectOptions.map(o => enhanceOption(o))
  // const inError = element.querySelector('div.govuk-form-group').className.includes('error')
  const inError = false
  const inputValue = element.value || ''

  // Autocomplete options get passed from Nunjucks params to data attributes
  const params = element.dataset

  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: inError ? '' : inputValue,
    selectElement: element,
    autoselect: params.autoselect === 'true',
    displayMenu: params.displayMenu,
    minLength: params.minLength ? parseInt(params.minLength) : 0,
    showAllValues: params.showAllValues === 'true',
    name: element.name,
    showNoOptionsFound: params.showNoOptionsFound === 'true',
    source: (query, populateResults) => {
      if (/\S/.test(query)) {
        populateResults(sort(query, options))
      }
    },
    templates: { suggestion: (value) => suggestion(value, options) },
    onConfirm: (val) => {
      const selectedOption = [].filter.call(selectOptions, option => (option.textContent || option.innerText) === val)[0]
      if (selectedOption) selectedOption.selected = true
    }
  })

  if (inError) {
    element.querySelector('input').value = inputValue
  }
}

export default function () {
  this.start = (element) => {
    setupAutoComplete(element)
  }
}
