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
    `${sectionPath}/check-your-answers`
  ]
}, {
  id: 'property-information',
  title: 'Property information',
  group: 'tenancy',
  paths: (sectionPath) => [
    `${sectionPath}/reference`,
    `${sectionPath}/postcode`,
      // ↳ Local authority if cannot be inferred from postcode
      `${sectionPath}/local-authority-known`,
      `${sectionPath}/local-authority`,
      // ↳ No postcode or local authority known
      `${sectionPath}/why-dont-you-know-postcode-or-la`,
    `${sectionPath}/is-relet`,
    `${sectionPath}/recent-relet-type`,
    `${sectionPath}/reason-for-vacancy`,
    `${sectionPath}/type-of-unit`,
    `${sectionPath}/type-of-property`,
    `${sectionPath}/is-adapted`,
    `${sectionPath}/number-of-bedrooms`,
    `${sectionPath}/void-date`,
    `${sectionPath}/repairs`,
    `${sectionPath}/times-previously-offered`,
    `${sectionPath}/check-your-answers`,

      // ↳ Reason for vacancy for propery that was not relet
      `${sectionPath}/reason-for-vacancy-non-relet`,
      `${sectionPath}/type-of-unit`,
      // ↳ Reason for vacancy for propery that was relet
      `${sectionPath}/reason-for-vacancy-relet`,
      `${sectionPath}/type-of-unit`,
      // ↳ Reason for vacancy was tenant moved
      `${sectionPath}/reason-for-vacancy-moved`,
      `${sectionPath}/type-of-unit`,
      // ↳ Reason for vacancy was tenant evicted
      `${sectionPath}/reason-for-vacancy-evicted`,
      `${sectionPath}/type-of-unit`
  ],
  forks: (sectionPath, keyPathRoot) => [{
    currentPath: `${sectionPath}/postcode`,
    forkPath: `${sectionPath}/is-relet`,
    storedData: keyPathRoot.concat('postcode-known'),
    values: ['true']
  }, {
    currentPath: `${sectionPath}/local-authority-known`,
    forkPath: `${sectionPath}/why-dont-you-know-postcode-or-la`,
    storedData: keyPathRoot.concat('local-authority-known'),
    values: ['false']
  }, {
    currentPath: `${sectionPath}/local-authority`, //from here
    forkPath: `${sectionPath}/is-relet`, //go here
    storedData: keyPathRoot.concat('local-authority-known'), //if this ===
    values: ['true'] //value
  }, {
    currentPath: `${sectionPath}/is-relet`,
    forkPath: `${sectionPath}/reason-for-vacancy-non-relet`,
    storedData: keyPathRoot.concat('is-relet'),
    values: ['false']
  }, {
    currentPath: `${sectionPath}/reason-for-vacancy`,
    forkPath: (value) => {
      switch (value) {
        case 'relet':
          return `${sectionPath}/reason-for-vacancy-relet`
        case 'moved':
          return `${sectionPath}/reason-for-vacancy-moved`
        case 'evicted':
          return `${sectionPath}/reason-for-vacancy-evicted`
        default:
          return `${sectionPath}/type-of-unit`
      }
    },
    storedData: keyPathRoot.concat('reason-for-vacancy'),
    excludedValues: []
  }]
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
