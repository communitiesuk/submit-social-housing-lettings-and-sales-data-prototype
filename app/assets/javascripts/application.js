// Sass entry point for rollup.js
import '../stylesheets/application.scss'

// Import GOV.UK Frontend
import GOVUKFrontend from 'govuk-frontend'

// Import GOV.UK Prototype Rig
import { components as GOVUKPrototypeRig } from 'govuk-prototype-rig/rig/all.js'

// Add app components to Rig
import FilterLayout from '../../components/filter-layout/filter-layout.js'
import Output from '../../components/output/output.js'

// Add app components to GOVUKPrototypeRig object
GOVUKPrototypeRig.Output = Output
GOVUKPrototypeRig.FilterLayout = FilterLayout

// Initiate scripts on page load
document.addEventListener('DOMContentLoaded', () => {
  GOVUKFrontend.initAll()
  GOVUKPrototypeRig.initAll()
})
