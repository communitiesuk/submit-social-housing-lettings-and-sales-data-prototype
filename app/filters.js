/**
 * Filters available for use in Nunjucks templates
 */
export default (env) => {
  const nunjucksSafe = env.getFilter('safe')
  const filters = {}

  /**
   * Covert govukDateFromInput field values to human readable value
   *
   * @example { day: '12', month: '11', year: '2021' } => 12 October 2021
   *
   * @param {object} object Date
   * @return {String} ISO 8601 date
   */
  filters.govukDateFromInput = (object) => {
    if (!object) {
      return
    }

    const date = Object.values(object).reverse().join('-')
    return filters.govukDate(date)
  }

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
    const noValueProvidedText = nunjucksSafe('<span class="app-!-colour-muted">You didn’t answer this question</span>')

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
      const date = filters.govukDateFromInput(value)
      return date !== 'Invalid Date' ? date : noValueProvidedText
    }

    // Arrays
    // We’ll just join them with commas, for now
    if (Array.isArray(value)) {
      return value.join(', ')
    }

    return value
  }

  /**
   * Covert date to human readable value
   *
   * @example 2021-10-11 => 11 October 2021
   *
   * @param {String} string Date
   * @return {String} Human readbable date
   */
  filters.govukDate = (s) => {
    return new Date(s).toLocaleDateString('en-GB', {
      year: 'numeric', month: 'long', day: 'numeric'
    })
  }

  /**
   * Logs an object in the template to the console in the browser.
   *
   * @example {{ "hello world" | log }}
   *
   * @param {any} a Any type
   * @return {String} A script tag with a `console.log` call.
   */
  filters.log = (a) => {
    return nunjucksSafe(`<script>console.log(${JSON.stringify(a, null, '\t')});</script>`)
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
