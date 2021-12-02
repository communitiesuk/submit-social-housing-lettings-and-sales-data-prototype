export default function () {
  this.start = (element) => {
    const outputElement = document.createElement('output')

    // Copy attributes from input element to output element
    outputElement.classList = element.classList
    outputElement.classList.add('app-input--output')
    outputElement.id = `${element.id}-output`
    outputElement.name = element.name
    outputElement.value = element.value
    outputElement.htmlFor = element.dataset.outputFor
    outputElement.setAttribute(
      'aria-describedby', element.getAttribute('aria-describedby')
    )

    // Insert output element
    element.after(outputElement)

    // Hide element used to input manually calculated total if no JS
    element.hidden = true

    // List of inputs that update output are in `for` attribute
    const inputIds = []
    outputElement.htmlFor.forEach(input => inputIds.push(`#${input}`))

    // Get all input elements
    const inputElements = document.querySelectorAll(inputIds)

    // Update output and original input element with new value
    const updateOutput = (input, inputs, output, total) => {
      input.addEventListener('keyup', (e) => {
        let sum = 0
        inputs.forEach((input, index, inputs) => {
          const value = inputs[index].value.split(',').join('.').split(' ').join('')
          sum += +value
        })

        output.value = total.value = sum.toFixed(2)
      })
    }

    inputElements.forEach((inputElement, index, inputElements) => {
      updateOutput(inputElements[index], inputElements, outputElement, element)
    })
  }
}
