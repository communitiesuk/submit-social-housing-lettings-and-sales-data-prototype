export const getById = (items, id) => {
  return items.find(item => item.id === id)
}

export const getEntryById = (items, id) => {
  for (const [key, value] of Object.entries(items)) {
    value.id = key
  }

  return items[id]
}
