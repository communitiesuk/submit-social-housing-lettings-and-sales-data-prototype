export default function ($module) {
  this.init = () => {
    if (!$module) {
      return
    }

    const outputElement = document.createElement('output')

    // Copy attributes from input element to output element
    outputElement.classList = $module.classList
    outputElement.classList.add('app-input--output')
    outputElement.id = `${$module.id}-output`
    outputElement.name = $module.name
    outputElement.value = $module.value
    outputElement.htmlFor = $module.dataset.outputFor
    outputElement.setAttribute(
      'aria-describedby', $module.getAttribute('aria-describedby')
    )

    // Insert output element
    $module.after(outputElement)

    // Hide element used to input manually calculated total if no JS
    $module.hidden = true

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
      updateOutput(inputElements[index], inputElements, outputElement, $module)
    })
  }
}
