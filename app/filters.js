/**
 * Filters available for use in Nunjucks templates
 */
export default (env) => {
  const safe = env.getFilter('safe')
  const govukDate = env.getFilter('govukDate')
  const isoDateFromDateInput = env.getFilter('isoDateFromDateInput')

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
    const noValueProvidedText = safe('<span class="app-!-colour-muted">You didn’t answer this question</span>')

    if (!value) {
      return noValueProvidedText
    }

    // Use structured answer from question data
    // (If no structured answer found, return given value)
    if (questions) {
      const question = questions.find(question => question.value === value)
      return question ? question.text : value
    }

    // Dates
    // (We’ll assume only dates are objects, for now)
    if (typeof value === 'object' && !Array.isArray(value)) {
      const date = govukDate(isoDateFromDateInput(value))
      return date !== 'Invalid Date' ? date : noValueProvidedText
    }

    // Arrays
    // We’ll just join them with commas, for now
    if (Array.isArray(value)) {
      return value.join(', ')
    }

    return value
  }

  filters.objectToArray = (object) => {
    const objArray = []
    Object.keys(object).forEach(key => objArray.push(
      { ...{ id: key }, ...object[key] }
    ))
    return objArray
  }

  return filters
}
