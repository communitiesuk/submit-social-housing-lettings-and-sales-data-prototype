export default function () {
  this.start = (element) => {
    // List of inputs that update output are in `for` attribute
    const inputIds = []
    element.htmlFor.forEach(input => inputIds.push(`#${input}`))

    // Get all input elements
    const inputElements = document.querySelectorAll(inputIds)

    // Update output element with new value
    const updateOutput = (inputElement, inputElements, outputElement) => {
      inputElement.addEventListener('keyup', (e) => {
        let sum = 0
        inputElements.forEach((input, index, inputs) => {
          const value = inputs[index].value.split(',').join('.').split(' ').join('')
          sum += +value
        })

        outputElement.value = sum.toFixed(2)
      })
    }

    inputElements.forEach((input, index, inputs) => {
      updateOutput(inputs[index], inputs, element)
    })
  }
}
