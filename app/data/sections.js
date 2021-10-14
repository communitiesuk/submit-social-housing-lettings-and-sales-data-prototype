export default [{
  id: 'about-this-log',
  title: 'About this log',
  paths: (sectionRoot) => [
    `${sectionRoot}/gdpr`,
    `${sectionRoot}/organisation`,
    `${sectionRoot}/check-your-answers`
  ],
  forks: (sectionRoot, keyPathRoot) => [{
    currentPath: `${sectionRoot}/gdpr`,
    forkPath: `${sectionRoot}/cannot-use-this-service`,
    storedData: keyPathRoot.concat('gdpr'),
    values: ['false']
  }]
}, {
  id: 'household-characteristics',
  title: 'Household characteristics',
  group: 'household'
}, {
  id: 'household-situation',
  title: 'Household situation',
  group: 'household',
  paths: (sectionRoot) => [
    `${sectionRoot}/previous-housing-situation`,
    `${sectionRoot}/previous-homelessness`,
    `${sectionRoot}/reason-for-leaving`,
    `${sectionRoot}/check-answers`
  ]
}, {
  id: 'household-needs',
  title: 'Household needs',
  group: 'household'
}, {
  id: 'tenancy-information',
  title: 'Tenancy information',
  group: 'tenancy',
  paths: (sectionRoot) => [
    `${sectionRoot}/start-date`,
    `${sectionRoot}/is-starter`,
    `${sectionRoot}/tenancy-type`,
    `${sectionRoot}/check-answers`
  ]
}, {
  id: 'property-information',
  title: 'Property information',
  group: 'tenancy'
}, {
  id: 'income-and-benefits',
  title: 'Income and benefits',
  group: 'rent'
}, {
  id: 'rent',
  title: 'Rent',
  group: 'rent'
}, {
  id: 'local-authority',
  title: 'Local authority',
  group: 'local-authority'
}, {
  id: 'declaration',
  title: 'Declaration',
  group: 'submission'
}]
