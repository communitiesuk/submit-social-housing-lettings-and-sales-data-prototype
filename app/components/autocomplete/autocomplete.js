import accessibleAutocomplete from 'accessible-autocomplete'
import sort from './sort/index.js'

const suggestion = (value, options) => {
  const option = options.find((option) => option.name === value)
  if (!option) {
    return 'No results found'
  }

  const html = option.append
    ? `<strong>${value}</strong> ${option.append}`
    : value
  return option.hint
    ? `${html}<br><span class="autocomplete__option__hint">${option.hint}</span>`
    : html
}

const enhanceOption = (option) => ({
  name: option.label,
  synonyms: option.dataset.synonyms ? option.dataset.synonyms.split('|') : [],
  append: option.dataset.append,
  hint: option.dataset.hint,
  boost: parseFloat(option.dataset.boost) || 1
})

export const setupAutoComplete = ($module) => {
  const selectOptions = Array.from($module.options)
  const options = selectOptions.map(enhanceOption)
  // const inError = element.querySelector('div.govuk-form-group').className.includes('error')
  const inError = false
  const inputValue = $module.value || ''

  // Autocomplete options get passed from Nunjucks params to data attributes
  const params = $module.dataset

  accessibleAutocomplete.enhanceSelectElement({
    defaultValue: inError ? '' : inputValue,
    selectElement: $module,
    autoselect: params.autoselect === 'true',
    displayMenu: params.displayMenu,
    minLength: params.minLength ? parseInt(params.minLength) : 0,
    showAllValues: params.showAllValues === 'true',
    name: $module.name,
    showNoOptionsFound: params.showNoOptionsFound === 'true',
    source: (query, populateResults) => {
      if (/\S/.test(query)) {
        populateResults(sort(query, options))
      }
    },
    templates: { suggestion: (value) => suggestion(value, options) },
    onConfirm: (val) => {
      const selectedOption = [].filter.call(
        selectOptions,
        (option) => (option.textContent || option.innerText) === val
      )[0]

      if (selectedOption) {
        selectedOption.selected = true
      }

      if (selectOptions.some((option) => option.selected && option.value)) {
        enableDependentButtons()
      } else {
        disableDependentButtons()
      }
    }
  })

  if (inError) {
    $module.querySelector('input').value = inputValue
  }
}

const disableDependentButtons = () => {
  document
    .querySelectorAll('button[data-requires-autocomplete]')
    .forEach((e) => {
      e.setAttribute('disabled', true)
    })
}

const enableDependentButtons = () => {
  document
    .querySelectorAll('button[data-requires-autocomplete]')
    .forEach((e) => {
      e.removeAttribute('disabled')
    })
}

export default function ($module) {
  this.init = () => {
    if (!$module) {
      return
    }

    disableDependentButtons()
    setupAutoComplete($module)
  }
}
