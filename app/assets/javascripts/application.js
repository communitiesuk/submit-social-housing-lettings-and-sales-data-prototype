// Sass entrypoint for rollup.js
import '../stylesheets/application.scss'

// Import modules
import './modules.js'
import './modules/edge.js'
import 'accessible-autocomplete'

// Initiate scripts on page load
document.addEventListener('DOMContentLoaded', () => {
  window.GOVUKFrontend.initAll()
  window.PrototypeRig.modules.start()
})
