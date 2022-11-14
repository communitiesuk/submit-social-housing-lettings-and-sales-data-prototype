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

// Bulk upload error report page - expandable table rows
const detailsLinks = document.querySelectorAll('[data-module="details-link"]')
const specificationDetails = document.querySelectorAll('[data-module="specification-details"]')

detailsLinks.forEach(function (link, index) {
    link.setAttribute("id", `details-link-${index}`);
});

specificationDetails.forEach((link, index) => {
    link.setAttribute("id", `specification-details-${index}`);
});

detailsLinks.forEach((link) => {
    link.addEventListener("click", () => {
        const id = link.getAttribute('id')
        const index = id.replace('details-link-', '');
        const specificationDetails = document.getElementById(`specification-details-${index}`)
        specificationDetails.classList.toggle('govuk-visually-hidden')

        const detailsLink = document.getElementById(`details-link-${index}`)
        detailsLink.classList.toggle('expand-details-link')
        detailsLink.classList.toggle('collapse-details-link')
    });
})


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
