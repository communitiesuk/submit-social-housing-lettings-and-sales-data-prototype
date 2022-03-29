function insertAfter (newNode, existingNode) {
  existingNode.parentNode.insertBefore(newNode, existingNode.nextSibling)
}

class AddAnother {
  constructor (options) {
    this.options = options
    this.container = this.options.container
    this.title = this.options.title
  }

  onAddButtonClick (event) {
    const items = this.getItems()
    const item = this.getNewItem()
    // this.updateAttributes(this.getItems().length, item)
    // this.resetItem(item)
    const firstItem = items[0]
    const lastItem = items[items.length - 1]

    if (!this.hasRemoveButton(firstItem)) {
      this.createRemoveButton(firstItem)
    }

    insertAfter(item, lastItem)

    const formElements = item.querySelectorAll('input, textarea, select')
    formElements[0].focus()
  }

  hasRemoveButton (item) {
    return item.querySelectorAll('.app-add-another__remove-button').length
  }

  getItems () {
    return this.container.querySelectorAll('.app-add-another__item')
  }

  getNewItem () {
    const items = this.getItems()
    const item = items[0].cloneNode(true)

    // Add remove button
    this.createRemoveButton(item)

    return item
  }

  // updateAttributes (index, item) {
  //   item.find('[data-name]').each(function (i, el) {
  //     const originalId = el.id

  //     el.name = $(el).attr('data-name').replace(/%index%/, index)
  //     el.id = $(el).attr('data-id').replace(/%index%/, index)

  //     const label = $(el).siblings('label')[0] || $(el).parents('label')[0] || item.find('[for="' + originalId + '"]')[0]
  //     label.htmlFor = el.id
  //   })
  // }

  // resetItem (item) {
  //   item.find('[data-name], [data-id]').each(function (index, el) {
  //     if (el.type === 'checkbox' || el.type === 'radio') {
  //       el.checked = false
  //     } else {
  //       el.value = ''
  //     }
  //   })
  // }

  createRemoveButton (item) {
    this.removeButton = document.createElement('button')
    this.removeButton.classList.add('govuk-button', 'govuk-button--secondary', 'app-add-another__remove-button')
    this.removeButton.innerText = 'Remove'
    this.removeButton.type = 'button'
    this.removeButton.addEventListener('click', this.onRemoveButtonClick.bind(this))

    item.append(this.removeButton)
  }

  onRemoveButtonClick (event) {
    event.currentTarget.parentElement.remove()

    const items = this.getItems()
    if (items.length === 1) {
      items.forEach(item =>
        item.querySelector('.app-add-another__remove-button').remove()
      )
    }

    // items.each($.proxy(function (index, el) {
    //   this.updateAttributes(index, $(el))
    // }, this))

    this.focusHeading()
  }

  focusHeading () {
    const heading = this.container.querySelector('.app-add-another__heading')
    heading.focus()
  }

  init () {
    if (this.container.dataset.addAnotherInitialised) {
      return
    }

    this.container.dataset.addAnotherInitialised = true

    const addButton = this.container.querySelector('.app-add-another__add-button')
    addButton.setAttribute('type', 'button')
    addButton.addEventListener('click', this.onAddButtonClick.bind(this))
  }
}

export default function () {
  this.start = (element) => {
    const addAnother = new AddAnother({
      container: element,
      title: 'Property'
    })

    addAnother.init()
  }
}
