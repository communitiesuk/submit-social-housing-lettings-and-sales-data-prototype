import logs from './data/logs.js'
import questions from './data/questions.js'
import organisations from './data/organisations.js'
import roles from './data/roles.js'
import schemes from './data/schemes.js'
import users from './data/users.js'

export default async () => ({
  logs,
  groups: [{
    id: 'before-you-start',
    title: 'Before you start'
  }, {
    id: 'household',
    title: 'About the household'
  }, {
    id: 'tenancy',
    title: 'Tenancy and property information'
  }, {
    id: 'finances',
    title: 'Finances'
  }, {
    id: 'submission',
    title: 'Submission'
  }],
  questions: await questions(),
  organisations,
  roles,
  schemes,
  users
})
