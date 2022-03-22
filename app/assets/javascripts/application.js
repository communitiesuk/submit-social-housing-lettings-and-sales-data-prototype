// Sass entry point for rollup.js
import '../stylesheets/application.scss'

// Import GOV.UK Frontend
import GOVUKFrontend from 'govuk-frontend'

// Import GOV.UK Prototype Components
import GOVUKPrototypeComponents from 'govuk-prototype-components'

// Add app components to Rig
import FilterLayout from '../../components/filter-layout/filter-layout.js'
import Output from '../../components/output/output.js'

// Add app components to GOVUKPrototypeRig object
GOVUKPrototypeComponents.Output = Output
GOVUKPrototypeComponents.FilterLayout = FilterLayout

// Initiate scripts on page load
document.addEventListener('DOMContentLoaded', () => {
  GOVUKFrontend.initAll()
  GOVUKPrototypeComponents.initAll()
})
