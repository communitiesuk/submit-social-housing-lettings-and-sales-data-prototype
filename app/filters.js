import * as utils from './utils.js'

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
    const isoDateFromDateInput = env.getFilter('isoDateFromDateInput')

    const noValueProvidedText = safe('<span class="app-!-colour-muted">You didn’t answer this question</span>')

    // Nunjucks sometimes returns an object with an empty value
    if (!value || value.val === '') {
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
          const text = question ? question.answer || question.text : item
          items.push(text)
        })
        return items.join(', ')
      }

      // Single structured answer (from radio)
      value = String(value)
      const question = questions.find(question => question.value === value)
      return question ? question.answer || question.text : value
    }

    // Dates
    // (We’ll assume only dates are objects, for now)
    if (typeof value === 'object' && !Array.isArray(value)) {
      const date = isoDateFromDateInput(value)
      return date !== 'Invalid DateTime' ? date : false
    }

    return value
  }

  filters.optionItems = (array, { text, value, hint } = {}) => {
    text = text || 'name'
    value = value || 'id'
    hint = hint || false

    if (!array) {
      return
    }

    if (!Array.isArray(array)) {
      array = utils.objectToArray(array)
    }

    if (array.length > 1) {
      array = array.sort((a, b) => {
        if (a[text] && b[text]) {
          const fa = a[text].toLowerCase()
          const fb = b[text].toLowerCase()

          if (fa < fb) { return -1 }
          if (fa > fb) { return 1 }
        }

        return 0
      })
    }

    array = array.map(item => {
      if (item.divider) {
        return item
      }

      return {
        text: item[text],
        value: item[value],
        ...((item[hint]) && {
          hint: {
            html: item[hint]
          }
        })
      }
    })

    return array
  }

  return filters
}
