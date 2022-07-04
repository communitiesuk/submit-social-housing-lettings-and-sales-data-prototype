import { writeFile } from 'node:fs/promises'

/**
 * Generate dataset
 *
 * @param {Function} generator - Function to generate data
 * @param {string} fileName - File name
 */
export const generateDataset = (generator, fileName) => {
  const filePath = `./app/data/generated/${fileName}.json`
  const fileData = JSON.stringify(generator, null, 2)

  try {
    writeFile(filePath, fileData)
    console.info(`Data generated: ${filePath}`)
  } catch (error) {
    console.error(error)
  }
}

/**
 * Generate a unique ID
 *
 * @returns {string}
 */
export const generateUniqueId = () => {
  return (Number(new Date())).toString(36).slice(-5).toUpperCase()
}

/**
 * Generate results page
 *
 * @param {Array} items - Items to paginate
 * @param {number} currentPage - Current page
 * @param {number} limit - Limit of items per page
 * @returns {object}
 */
export const getResults = function (items, currentPage, limit) {
  const count = items.length
  const skip = (currentPage - 1) * limit
  const resultsFrom = (currentPage - 1) * limit + 1
  let resultsTo = resultsFrom - 1 + limit
  resultsTo = resultsTo > count ? count : resultsTo

  return {
    page: items.slice(skip, skip + limit),
    to: resultsTo,
    from: resultsFrom,
    count
  }
}

/**
 * Generate pagination items
 *
 * @param {Array} items - Items to paginate
 * @param {number} currentPage - Current page
 * @param {number} limit - Limit of items per page
 * @returns {object}
 */
export const getPagination = function (items, currentPage, limit) {
  const count = items.length
  const totalPages = Math.ceil(count / limit)
  const nextPage = currentPage < totalPages ? currentPage + 1 : false
  const previousPage = currentPage > 0 ? currentPage - 1 : false
  const pageItems = [...Array(totalPages).keys()].map((item) => ({
    current: item + 1 === currentPage,
    href: `?${new URLSearchParams({ page: item + 1, limit })}`,
    number: item + 1
  }))

  return {
    items: pageItems.length > 1 ? pageItems : false,
    current: currentPage,
    next: nextPage
      ? {
          href: `?${new URLSearchParams({ page: nextPage, limit })}`
        }
      : false,
    previous: previousPage
      ? {
          href: `?${new URLSearchParams({ page: previousPage, limit })}`
        }
      : false
  }
}

/**
 * Get data object from an array
 *
 * @param {Array} items - Array of data objects
 * @param {string} id - Data object ID
 * @returns {object}
 */
export const getFromArrayById = (items, id) => {
  return items.find(item => item.id === id)
}

/**
 * Get data object from an object.
 * Adds `id` value to returned object if missing.
 *
 * @param {object} items - Object of data objects
 * @param {string} id - Data object ID
 * @returns {object}
 */
export const getFromObjectById = (items, id) => {
  for (const [key, value] of Object.entries(items)) {
    value.id = key
  }

  if (!items[id]) {
    throw Error(`Entry with ID ‘${id}’ not found`)
  }

  return items[id]
}

/**
 * Convert object to an array
 *
 * @param {object} object - Object of data objects
 * @returns {Array} Array of data objects
 */
export const objectToArray = (object) => {
  const objArray = []
  Object.keys(object).forEach(key => objArray.push(
    { ...{ id: key }, ...object[key] }
  ))
  return objArray
}

/**
 * Sort an array by key value
 *
 * @param {Array} array - Array of data objects
 * @param {string} key - Key to sort by
 * @returns {Array}
 */
export const sortArray = (array, key) => {
  return array.sort((a, b) => {
    // If key not provided, don’t sort
    if (!a[key] || !b[key]) {
      return 0
    }

    const fa = a[key].toLowerCase()
    const fb = b[key].toLowerCase()

    if (fa < fb) { return -1 }
    if (fa > fb) { return 1 }
    return 0
  })
}
