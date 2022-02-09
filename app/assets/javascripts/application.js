// Sass entry point for rollup.js
import '../stylesheets/application.scss'

// Import GOV.UK Frontend
import GOVUKFrontend from 'govuk-frontend'

// Import GOV.UK Prototype Rig
import { components as GOVUKPrototypeRig } from 'govuk-prototype-rig/rig/all.js'

// Add app components to Rig
import { FilterToggleButton } from '../../components/filter-layout/filter-layout.js'
import Output from '../../components/output/output.js'

// Add app components to GOVUKPrototypeRig object
GOVUKPrototypeRig.Output = Output

// Filter toggle
const filterToggleButton = new FilterToggleButton({
  bigModeMediaQuery: '(min-width: 48.063em)',
  startHidden: false,
  toggleButton: {
    container: document.querySelector('.app-filter-toggle'),
    showText: 'Show filters',
    hideText: 'Hide filters',
    classes: 'govuk-button--secondary'
  },
  closeButton: {
    container: document.querySelector('.app-filter__header'),
    text: 'Close'
  },
  filter: {
    container: document.querySelector('.app-filter-layout__filter')
  }
})

// Initiate scripts on page load
document.addEventListener('DOMContentLoaded', () => {
  filterToggleButton.init()
  GOVUKFrontend.initAll()
  GOVUKPrototypeRig.initAll()
})
