import { writeFile } from 'node:fs/promises'

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
 * Generate pagination items
 *
 * @param {number} currentPage Current page
 * @param {limit} limit Limit of items per page
 * @param {count} count Count of all items
 * @returns {object}
 */
export const getPaginationItems = function (currentPage, limit, count) {
  // Pagination pages
  const totalPages = Math.ceil(count / limit)
  const nextPage = currentPage < totalPages ? currentPage + 1 : false
  const previousPage = currentPage > 0 ? currentPage - 1 : false
  const pageItems = [...Array(totalPages).keys()].map((item) => ({
    current: item + 1 === currentPage,
    href: `?${new URLSearchParams({ page: item + 1, limit })}`,
    text: item + 1
  }))

  // Pagination results
  const resultsFrom = (currentPage - 1) * limit + 1
  let resultsTo = resultsFrom - 1 + limit
  resultsTo = resultsTo > count ? count : resultsTo

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
      : false,
    results: {
      from: resultsFrom,
      to: resultsTo,
      count
    }
  }
}

export const generateUniqueId = () => {
  return (Number(new Date())).toString(36).slice(-5).toUpperCase()
}

export const getById = (items, id) => {
  return items.find(item => item.id === id)
}

export const getEntityById = (items, id) => {
  for (const [key, value] of Object.entries(items)) {
    value.id = key
  }

  if (!items[id]) {
    throw Error(`Entry with ID ‘${id}’ not found`)
  }

  return items[id]
}

export const objectToArray = (object) => {
  const objArray = []
  Object.keys(object).forEach(key => objArray.push(
    { ...{ id: key }, ...object[key] }
  ))
  return objArray
}

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
