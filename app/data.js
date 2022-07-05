import { createRequire } from 'node:module'
import questions from './data/questions.js'
import roles from './data/roles.js'
import users from './data/users.js'

const require = createRequire(import.meta.url)

export default async () => ({
  features: {
    '2022-23': {
      on: true,
      name: 'Use 2022/23 questions'
    },
    'card-logs': {
      on: true,
      name: 'Use log summary cards in logs views'
    }
  },
  filter: {
    user: ['DP-OWNER'],
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
  logs: require('./data/generated/logs.json'),
  organisations: require('./data/generated/organisations.json'),
  questions: await questions(),
  rentPeriods: [{
    text: 'Every 2 weeks',
    value: 'fortnightly'
  }, {
    text: 'Every 4 weeks',
    value: 'every-4-weeks'
  }, {
    text: 'Every calendar month',
    value: 'monthly'
  }, {
    text: 'Weekly for 50 weeks',
    value: 'weekly-50'
  }, {
    text: 'Weekly for 49 weeks',
    value: 'weekly-49'
  }, {
    text: 'Weekly for 48 weeks',
    value: 'weekly-48'
  }, {
    text: 'Weekly for 47 weeks',
    value: 'weekly-47'
  }, {
    text: 'Weekly for 46 weeks',
    value: 'weekly-46'
  }, {
    text: 'Weekly for 52 weeks',
    value: 'weekly-52'
  }, {
    text: 'Weekly for 53 weeks',
    value: 'weekly-53'
  }],
  roles,
  schemes: require('./data/generated/schemes.json'),
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
      colour: 'blue',
      canStart: true
    },
    completed: {
      id: 'completed',
      text: 'Completed',
      colour: 'green',
      canStart: true
    },
    active: {
      id: 'active',
      text: 'Active',
      colour: 'green'
    },
    submitted: {
      id: 'completed',
      text: 'Submitted',
      colour: 'purple',
      canStart: true
    },
    inactive: {
      id: 'inactive',
      text: 'Inactive',
      colour: 'orange'
    },
    cannotStart: {
      id: 'cannotStart',
      text: 'Cannot start yet',
      colour: 'grey'
    }
  },
  users,
  exampleAccounts: {
    coordinator: [{
      value: 'data.coordinator@malinsgroup.co.uk',
      text: 'Organisation owns housing stock and uses agents to manage the properties'
    }, {
      value: 'data.coordinator@believehousing.co.uk',
      text: 'Organisation owns and manages their own housing stock'
    }, {
      value: 'data.coordinator@placesforpeople.co.uk',
      text: 'Organisation owns and manages housing stock and that of other organisations'
    }, {
      value: 'data.coordinator@bcwa.org.uk',
      text: 'Organisation manages properties for other organisations'
    }],
    provider: [{
      value: 'data.provider@malinsgroup.co.uk',
      text: 'Organisation owns housing stock and uses agents to manage the properties'
    }, {
      value: 'data.provider@believehousing.co.uk',
      text: 'Organisation owns and manages their own housing stock'
    }, {
      value: 'data.provider@placesforpeople.co.uk',
      text: 'Organisation owns and manages housing stock and that of other organisations'
    }, {
      value: 'data.provider@bcwa.org.uk',
      text: 'Organisation manages properties for other organisations'
    }]
  }
})
