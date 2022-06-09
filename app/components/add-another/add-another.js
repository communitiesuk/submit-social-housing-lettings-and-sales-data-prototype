import { setupAutoComplete } from '../autocomplete/autocomplete.js'

const getItems = (container) => {
  return container.querySelectorAll('.app-add-another__item')
}

const createNewItem = (element) => {
  const item = getItems(element)[0]
  const newItem = item.cloneNode(true)

  if (!hasRemoveButton(newItem)) {
    createRemoveButton(newItem)
  }

  // Remove autocomplete wrapper as we’ll enhanced the cloned select instead
  if (newItem.querySelector('.autocomplete__wrapper')) {
    newItem.querySelector('.autocomplete__wrapper').remove()
  }

  const removeButton = newItem.querySelector('.app-add-another__remove-button')
  removeButton.addEventListener('click', (event) => onRemoveButtonClick(event))

  return newItem
}

const resetItem = (item) => {
  const inputs = item.querySelectorAll('[data-name]')
  inputs.forEach((input, index) => {
    if (input.type === 'checkbox' || input.type === 'radio') {
      input.checked = false
    } else {
      console.log('input to reset', input)
      input.value = ''
    }
  })
}

const hasRemoveButton = (item) => {
  return item.querySelectorAll('.app-add-another__remove-button').length
}

const createRemoveButton = (item) => {
  const removeButton = document.createElement('button')
  removeButton.type = 'button'
  removeButton.classList.add('app-add-another__remove-button')
  removeButton.innerText = 'Remove'

  item.append(removeButton)
}

const focusHeading = () => {
  document.querySelector('.app-add-another__heading').focus()
}

const updateAttributes = (index, item) => {
  const inputs = item.querySelectorAll(['.govuk-input', '.govuk-select'])
  console.log('inputs', inputs)

  inputs.forEach((input) => {
    // [data][item][0] => [data][item][1]
    input.name = input.name.replace(/(.*\[)[\d](\])/, '$1' + index + '$2')

    console.log('autoselect?', input.dataset.module)

    if (input.dataset.module === 'autocomplete') {
      // data-item-0-select => data-item-1-select
      input.id = input.id.replace(/(.*-)[\d]*(-select)/, '$1' + index)

      // Remove value
      input.value = ''

      // Set up auto complete
      setupAutoComplete(input)
    } else {
      // data-item-0 => data-item-1
      input.id = input.id.replace(/(.*-)[\d]*/, '$1' + index)
    }

    const label = item.querySelectorAll('label')[0]
    label.setAttribute('for', input.id)
  })
}

const onAddButtonClick = (event, container) => {
  const item = createNewItem(container)

  updateAttributes(getItems(container).length, item)
  resetItem(item)

  const firstItem = getItems(container)[0]
  if (!hasRemoveButton(firstItem)) {
    createRemoveButton(firstItem)
  }

  getItems(container)[getItems(container).length - 1].after(item)

  item.querySelectorAll('input, textarea, select')[0].focus()
}

const onRemoveButtonClick = function (event) {
  const item = event.target.parentNode
  const container = item.parentNode
  item.remove()

  const items = getItems(container)

  if (items.length === 1) {
    items[0].querySelector('.app-add-another__remove-button').remove()
  }

  items.forEach((item, index) => {
    updateAttributes(index, item)
  })

  focusHeading()
}

export default function () {
  this.start = (element) => {
    const addButtons = element.querySelectorAll('.app-add-another__add-button')
    for (const addButton of addButtons) {
      addButton.type = 'button'
      addButton.addEventListener('click', (event) => onAddButtonClick(event, element))
    }

    const removeButtons = element.querySelectorAll('.app-add-another__remove-button')
    for (const removeButton of removeButtons) {
      removeButton.type = 'button'
      removeButton.addEventListener('click', (event) => onRemoveButtonClick(event))
    }
  }
};
