import logs from './data/logs.js'
import sections from './data/sections.js'
import questions from './data/questions.js'

export default (async () => ({
  logs,
  groups: [{
    id: 'household',
    title: 'About the household'
  }, {
    id: 'tenancy',
    title: 'Tenancy and property information'
  }, {
    id: 'rent',
    title: 'Rent and charges'
  }, {
    id: 'local-authority',
    title: 'Local authority'
  }, {
    id: 'submission',
    title: 'Submission'
  }],
  sections,
  questions: await questions()
}))()
