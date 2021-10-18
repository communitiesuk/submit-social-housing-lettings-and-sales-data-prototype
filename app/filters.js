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
   * @param {object} object Date
   * @return {String} ISO 8601 date
   */
  filters.textFromInputValue = (value, questions) => {
    const noValueProvidedText = '<span class="govuk-hint">You didn’t answer this question</span>'
    if (!questions) { //check text value
      if (!value) {
        return nunjucksSafe(noValueProvidedText)
      }
      if (value.month) {
        return filters.govukDateFromInput(value)
      }
      return value
    } 

    else { //check question values
      if (!value) {
        return nunjucksSafe(noValueProvidedText)
      }
      else {
        const { text } = questions.find(question => question.value === value)
        return text
      }
      
    }
    
    
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
