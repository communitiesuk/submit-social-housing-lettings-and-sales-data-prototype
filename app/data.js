import logs from './data/logs.js'
import questions from './data/questions.js'
import organisations from './data/organisations.js'
import roles from './data/roles.js'
import schemes from './data/schemes.js'
import users from './data/users.js'

export default async () => ({
  features: {
    '2022-23': {
      on: true,
      name: 'Use 2022/23 questions'
    }
  },
  logs,
  groups: [{
    id: 'before-you-start',
    title: 'Before you start'
  }, {
    id: 'tenancy',
    title: 'Property and tenancy information'
  }, {
    id: 'household',
    title: 'About the household'
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
