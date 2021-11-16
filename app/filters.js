import _ from 'lodash'

/**
 * Prototype specific filters for use in Nunjucks templates.
 */
export default (env) => {
  const filters = {}

  /**
   * Covert saved value to human readable text
   *
   * @example 'fixed-secure' => Fixed term – Secure
   *
   * @param {object|String|Array} value Value entered/chosen
   * @param {object} questions Question data
   * @return {String} Formatted answer
   */
  filters.textFromInputValue = (value, questions) => {
    const safe = env.getFilter('safe')
    const govukDate = env.getFilter('govukDate')
    const isoDateFromDateInput = env.getFilter('isoDateFromDateInput')

    const noValueProvidedText = safe('<span class="app-!-colour-muted">You didn’t answer this question</span>')

    if (!value) {
      return noValueProvidedText
    }

    // Use structured answer from question data
    // (If no structured answer found, return given value)
    if (questions) {
      // Multiple structured answers (from checkboxes)
      if (Array.isArray(value)) {
        const items = []
        value.forEach(item => {
          item = String(item)
          const question = questions.find(question => question.value === item)
          const text = question ? question.text : item
          items.push(text)
        })
        return items.join(', ')
      }

      // Single structured answer (from radio)
      value = String(value)
      const question = questions.find(question => question.value === value)
      return question ? question.text : value
    }

    // Dates
    // (We’ll assume only dates are objects, for now)
    if (typeof value === 'object' && !Array.isArray(value)) {
      const date = govukDate(isoDateFromDateInput(value))
      return date !== 'Invalid Date' ? date : noValueProvidedText
    }

    return value
  }

  filters.where = (array, key, compare) => {
    compare = [].concat(compare) // Force to Array

    const filtered = array.filter(item => {
      return compare.includes(_.get(item, key))
    })

    return filtered
  }

  filters.optionItems = (array, text, value) => {
    const options = array
      .sort((a, b) => {
        const fa = a.name.toLowerCase()
        const fb = b.name.toLowerCase()

        if (fa < fb) { return -1 }
        if (fa > fb) { return 1 }
        return 0
      })
      .map(item => ({ text: item[text], value: item[value] }))

    return options
  }

  return filters
}
