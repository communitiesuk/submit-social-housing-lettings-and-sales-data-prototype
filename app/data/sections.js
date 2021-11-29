export default (log) => {
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
    group: 'household'
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
   * Income and benefits
   */
  const incomeAndBenefits = {
    id: 'income-and-benefits',
    title: 'Income and benefits',
    group: 'rent'
  }

  /**
   * Rent
   */
  const rent = {
    id: 'rent',
    title: 'Rent',
    group: 'rent'
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
   * Local authority
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
    incomeAndBenefits,
    rent,
    localAuthority,
    declaration
  ]
}
