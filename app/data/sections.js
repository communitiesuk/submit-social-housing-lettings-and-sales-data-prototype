export default [{
  id: 'about-this-log',
  title: 'About this log',
  paths: (sectionPath) => [
    `${sectionPath}/gdpr`,
    `${sectionPath}/organisation`,
    `${sectionPath}/sale-or-letting`,
    `${sectionPath}/letting-renewal`,
    `${sectionPath}/letting-start-date`,
    `${sectionPath}/letting-type`,
    `${sectionPath}/tenant-code`,
    `${sectionPath}/check-your-answers`,
    `${sectionPath}/sale-completion-date`,
    `${sectionPath}/purchaser-code`,
    `${sectionPath}/check-your-answers`
  ],
  forks: (sectionPath, keyPathRoot) => [{
    currentPath: `${sectionPath}/gdpr`,
    forkPath: `${sectionPath}/cannot-use-this-service`,
    storedData: keyPathRoot.concat('gdpr'),
    values: ['false']
  }, {
    currentPath: `${sectionPath}/sale-or-letting`,
    forkPath: `${sectionPath}/sale-completion-date`,
    storedData: keyPathRoot.concat('sale-or-letting'),
    values: ['sale']
  }]
}, {
  id: 'household-characteristics',
  title: 'Household characteristics',
  group: 'household'
}, {
  id: 'household-situation',
  title: 'Household situation',
  group: 'household',
  paths: (sectionPath) => [
    `${sectionPath}/previous-housing-situation`,
    `${sectionPath}/previous-homelessness`,
    `${sectionPath}/reason-for-leaving`,
    `${sectionPath}/check-your-answers`
  ]
}, {
  id: 'household-needs',
  title: 'Household needs',
  group: 'household'
}, {
  id: 'tenancy-information',
  title: 'Tenancy information',
  group: 'tenancy',
  paths: (sectionPath) => [
    `${sectionPath}/start-date`,
    `${sectionPath}/is-starter`,
    `${sectionPath}/tenancy-type`,
    `${sectionPath}/check-answers`
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
