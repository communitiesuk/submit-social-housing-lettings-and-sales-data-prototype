import { writeFile } from 'node:fs/promises'

export const generateDataset = (generator, fileName) => {
  const filePath = `./app/datasets/generated/${fileName}.json`
  const fileData = JSON.stringify(generator, null, 2)

  try {
    writeFile(filePath, fileData)
    console.info(`Data generated: ${filePath}`)
  } catch (error) {
    console.error(error)
  }
}

export const generateUniqueId = () => {
  return (Number(new Date())).toString(36).slice(-5).toUpperCase()
}

export const getById = (items, id) => {
  return items.find(item => item.id === id)
}

export const getByPath = (items, path) => {
  return items.find(item => item.path === path)
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
