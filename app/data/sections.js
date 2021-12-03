export function sections (log) {
  const logPath = `/logs/${log.id}`

  const getPaths = (sectionId, paths) => {
    return paths.map(path => `${logPath}/${sectionId}/${path}`)
  }

  /**
   * About this log
   */
  const aboutThisLog = {
    id: 'about-this-log',
    title: 'About this log',
    group: 'before-you-start',
    paths: getPaths('about-this-log', [
      'gdpr',
      'sale-or-letting',
      'uses-scheme',
      'organisation',
      'letting-renewal',
      'letting-start-date',
      'type-of-rent',
      'tenant-code',
      'check-your-answers',
      'sale-completion-date',
      'purchaser-code',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/gdpr`,
      forkPath: `${sectionPath}/cannot-use-this-service`,
      storedData: keyPathRoot.concat('gdpr'),
      values: ['false']
    }, {
      currentPath: `${sectionPath}/uses-scheme`,
      forkPath: `${sectionPath}/scheme`,
      storedData: keyPathRoot.concat('uses-scheme'),
      values: ['true']
    }, {
      currentPath: `${sectionPath}/scheme`,
      skipTo: `${sectionPath}/letting-renewal`
    }, {
      currentPath: `${sectionPath}/type-of-rent`,
      forkPath: `${sectionPath}/type-of-need`,
      storedData: keyPathRoot.concat('uses-scheme'),
      values: ['false']
    }, {
      currentPath: `${sectionPath}/type-of-need`,
      skipTo: `${sectionPath}/tenant-code`
    }, {
      currentPath: `${sectionPath}/sale-or-letting`,
      forkPath: `${sectionPath}/sale-completion-date`,
      storedData: keyPathRoot.concat('sale-or-letting'),
      values: ['sale']
    }]
  }

  /**
   * Household characteristics
   */
  const householdCharacteristics = {
    id: 'household-characteristics',
    title: 'Household characteristics',
    group: 'household',
    paths: getPaths('household-characteristics', [
      'number-in-household',
      // Tenant 1 (lead)
      'lead-tenant-age',
      'lead-tenant-gender',
      'lead-tenant-nationality',
      'lead-tenant-working-situation',
      // Tenant 2
      'tenant-2-known',
      'tenant-2-relationship',
      'tenant-2-age',
      'tenant-2-gender',
      'tenant-2-working-situation',
      // Tenant 3
      'tenant-3-known',
      'tenant-3-relationship',
      'tenant-3-age',
      'tenant-3-gender',
      'tenant-3-working-situation',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/lead-tenant-working-situation`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('number-in-household'),
      values: ['1']
    }, {
      currentPath: `${sectionPath}/tenant-2-known`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('tenant-2-known'),
      values: ['false']
    }, {
      currentPath: `${sectionPath}/tenant-2-working-situation`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('number-in-household'),
      values: ['2']
    }, {
      currentPath: `${sectionPath}/tenant-3-known`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('tenant-3-known'),
      values: ['false']
    }]
  }

  /**
   * Household situation
   */
  const householdSituation = {
    id: 'household-situation',
    title: 'Household situation',
    group: 'household',
    paths: getPaths('household-situation', [
      'previous-housing-situation',
      'previous-homelessness',
      'reason-for-leaving',
      'check-your-answers'
    ])
  }

  /**
   * Household needs
   */
  const householdNeeds = {
    id: 'household-needs',
    title: 'Household needs',
    group: 'household'
  }

  /**
   * Tenancy information
   */
  const tenancyInformation = {
    id: 'tenancy-information',
    title: 'Tenancy information',
    group: 'tenancy',
    paths: getPaths('tenancy-information', [
      'start-date',
      'is-starter',
      'type-of-tenancy',
      'check-your-answers'
    ])
  }

  /**
   * Property information
   */

  // General needs && not a renewal
  const propertyInformation = {
    id: 'property-information',
    title: 'Property information',
    group: 'tenancy',
    paths: getPaths('property-information', [
      'reference',
      'postcode',
      // ↳ Local authority if cannot be inferred from postcode
      'local-authority-known',
      'local-authority',
      // ↳ No postcode or local authority known
      'why-dont-you-know-postcode-or-la',
      'is-relet',
      'type-of-let',
      'reason-for-vacancy',
      'times-previously-offered',
      'type-of-unit',
      'type-of-property',
      'is-adapted',
      'number-of-bedrooms',
      'void-date',
      'repairs',
      'check-your-answers'
    ]),
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
      currentPath: `${sectionPath}/local-authority`,
      forkPath: `${sectionPath}/is-relet`,
      storedData: keyPathRoot.concat('local-authority-known'),
      values: ['true']
    }, {
      currentPath: `${sectionPath}/is-relet`,
      forkPath: `${sectionPath}/reason-for-vacancy-non-relet`,
      storedData: keyPathRoot.concat('is-relet'),
      values: ['false']
    }, {
      currentPath: `${sectionPath}/reason-for-vacancy-non-relet`,
      skipTo: `${sectionPath}/times-previously-offered`
    }, {
      currentPath: `${sectionPath}/void-date`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('reason-for-non-relet'),
      values: ['newprop']
    }]
  }

  // General needs && renewal
  const propertyInformationRenewal = {
    id: 'property-information-renewal',
    title: 'Property information',
    group: 'tenancy',
    paths: getPaths('property-information-renewal', [
      'reference',
      'postcode',
      // ↳ Local authority if cannot be inferred from postcode
      'local-authority-known',
      'local-authority',
      // ↳ No postcode or local authority known
      'why-dont-you-know-postcode-or-la',
      'type-of-unit',
      'type-of-property',
      'is-adapted',
      'number-of-bedrooms',
      'void-date',
      'repairs',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/postcode`,
      forkPath: `${sectionPath}/type-of-unit`,
      storedData: keyPathRoot.concat('postcode-known'),
      values: ['true']
    }, {
      currentPath: `${sectionPath}/local-authority-known`,
      forkPath: `${sectionPath}/why-dont-you-know-postcode-or-la`,
      storedData: keyPathRoot.concat('local-authority-known'),
      values: ['false']
    }, {
      currentPath: `${sectionPath}/local-authority`,
      forkPath: `${sectionPath}/type-of-unit`,
      storedData: keyPathRoot.concat('local-authority-known'),
      values: ['true']
    }, {
      currentPath: `${sectionPath}/reason-for-vacancy-non-relet`,
      skipTo: `${sectionPath}/times-previously-offered`
    }, {
      currentPath: `${sectionPath}/void-date`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('reason-for-non-relet'),
      values: ['newprop']
    }]
  }

  // Supported housing && not a renewal
  const propertyInformationSupportedHousing = {
    id: 'property-information-supported-housing',
    title: 'Property information',
    group: 'tenancy',
    paths: getPaths('property-information-supported-housing', [
      'reference',
      'is-relet',
      'type-of-let',
      'reason-for-vacancy',
      'times-previously-offered',
      'void-date',
      'repairs',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/is-relet`,
      forkPath: `${sectionPath}/reason-for-vacancy-non-relet`,
      storedData: keyPathRoot.concat('is-relet'),
      values: ['false']
    }, {
      currentPath: `${sectionPath}/reason-for-vacancy-relet`,
      skipTo: `${sectionPath}/is-adapted`
    }, {
      currentPath: `${sectionPath}/reason-for-vacancy-non-relet`,
      skipTo: `${sectionPath}/is-adapted`
    }]
  }

  // Supported housing && renewal
  const propertyInformationSupportedHousingRenewal = {
    id: 'property-information-supported-housing-renewal',
    title: 'Property information',
    group: 'tenancy',
    paths: getPaths('property-information-supported-housing-renewal', [
      'reference',
      'check-your-answers'
    ])
  }

  /**
   * Finances
   */
  const finances = {
    id: 'finances',
    title: 'Income, benefits and outgoings',
    group: 'finances',
    paths: getPaths('finances', [
      'income-period',
      'income-value',
      'income-benefits',
      'income-benefits-portion',
      'outgoings-period',
      'outgoings-value',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/outgoings-value`,
      forkPath: `${sectionPath}/outgoings-after-benefits`,
      storedData: keyPathRoot.concat('income-benefits'),
      excludedValues: ['none', 'unknown', 'prefers-not-to-say']
    }, {
      currentPath: `${sectionPath}/outgoings-after-benefits`,
      forkPath: (value) => {
        if (value === 'true') {
          return `${sectionPath}/outgoings-outstanding`
        } else {
          return `${sectionPath}/check-your-answers`
        }
      },
      storedData: keyPathRoot.concat('outgoings-after-benefits'),
      values: ['true', 'false']
    }, {
      currentPath: `${sectionPath}/outgoings-outstanding`,
      skipTo: `${sectionPath}/check-your-answers`
    }]
  }

  /**
   * Local authority
   */
  const localAuthority = {
    id: 'local-authority',
    title: 'Local authority',
    group: 'local-authority'
  }

  /**
   * Declaration
   */
  const declaration = {
    id: 'declaration',
    title: 'Declaration',
    group: 'submission'
  }

  // Answers to questions in ‘About this log’ affect questions shown in task list
  let isSupportedHousing
  let isRenewal
  if (log['about-this-log']) {
    isSupportedHousing = log['about-this-log']['uses-scheme'] === 'true'
    isRenewal = log['about-this-log']['letting-renewal'] === 'true'
  }

  return [
    aboutThisLog,
    householdCharacteristics,
    householdSituation,
    householdNeeds,
    tenancyInformation,
    ...(!isSupportedHousing && !isRenewal ? [propertyInformation] : []),
    ...(!isSupportedHousing && isRenewal ? [propertyInformationRenewal] : []),
    ...(isSupportedHousing && !isRenewal ? [propertyInformationSupportedHousing] : []),
    ...(isSupportedHousing && isRenewal ? [propertyInformationSupportedHousingRenewal] : []),
    finances,
    localAuthority,
    declaration
  ]
}
