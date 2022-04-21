import { createRequire } from 'node:module'
import logs from './data/logs.js'
import questions from './data/questions.js'
import roles from './data/roles.js'
import users from './data/users.js'

const require = createRequire(import.meta.url)

export default async () => ({
  features: {
    '2022-23': {
      on: true,
      name: 'Use 2022/23 questions'
    }
  },
  logs,
  filter: {
    user: ['DP001'],
    collection: ['2022/23'],
    status: ['complete', 'incomplete', 'submitted']
  },
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
  }],
  questions: await questions(),
  organisations: require('./datasets/generated/organisations.json'),
  roles,
  schemes: require('./datasets/generated/schemes.json'),
  statuses: {
    notStarted: {
      id: 'notStarted',
      text: 'Not started',
      colour: 'grey',
      canStart: true
    },
    inProgress: {
      id: 'inProgress',
      text: 'In progress',
      colour: 'grey',
      canStart: true
    },
    completed: {
      id: 'completed',
      text: 'Completed',
      colour: 'blue',
      canStart: true
    },
    submitted: {
      id: 'completed',
      text: 'Submitted',
      colour: 'green',
      canStart: true
    },
    cannotStart: {
      id: 'cannotStart',
      text: 'Cannot start yet',
      colour: 'grey'
    }
  },
  users
})
