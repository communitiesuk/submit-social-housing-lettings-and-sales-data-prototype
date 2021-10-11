import logs from './data/logs.js'

export default {
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
  sections: [{
    title: 'Household characteristics',
    group: 'household'
  }, {
    title: 'Household situation',
    group: 'household'
  }, {
    title: 'Household needs',
    group: 'household'
  }, {
    title: 'Tenancy information',
    group: 'tenancy'
  }, {
    title: 'Property information',
    group: 'tenancy'
  }, {
    title: 'Income and benefits',
    group: 'rent'
  }, {
    title: 'Rent',
    group: 'rent'
  }, {
    title: 'Local authority',
    group: 'local-authority'
  }, {
    title: 'Declaration',
    group: 'submission'
  }]
}
