// Sass entry point for rollup.js
import '../stylesheets/application.scss'

// Import GOV.UK Frontend
import { initAll as GOVUKFrontend } from 'govuk-frontend'

// Import Edge helper from GOV.UK Prototype Components
import { Edge } from 'govuk-prototype-components'

// Import app components
import AddAnother from '../../components/add-another/add-another.js'
import Autocomplete from '../../components/autocomplete/autocomplete.js'
import FilterLayout from '../../components/filter-layout/filter-layout.js'
import Output from '../../components/output/output.js'

// Initiate scripts on page load
document.addEventListener('DOMContentLoaded', () => {
  const $edges = document.querySelectorAll('[data-module="edge"]')
  $edges.forEach(function ($edge) {
    new Edge($edge).init()
  })

  const $adders = document.querySelectorAll('[data-module="add-another"]')
  $adders.forEach(function ($adder) {
    new AddAnother($adder).init()
  })

  const $autocompletes = document.querySelectorAll('[data-module="autocomplete"]')
  $autocompletes.forEach(function ($autocomplete) {
    new Autocomplete($autocomplete).init()
  })

  const $filterLayout = document.querySelector('[data-module="filter-layout"]')
  new FilterLayout($filterLayout).init()

  const $outputs = document.querySelectorAll('[data-module="output"]')
  $outputs.forEach(function ($output) {
    new Output($output).init()
  })

  GOVUKFrontend()
})
