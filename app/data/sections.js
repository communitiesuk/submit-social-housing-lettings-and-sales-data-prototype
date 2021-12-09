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
      'property-reference',
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
      currentPath: `${sectionPath}/sale-or-letting`,
      forkPath: `${sectionPath}/sale-completion-date`,
      storedData: keyPathRoot.concat('sale-or-letting'),
      values: ['sale']
    }, {
      currentPath: `${sectionPath}/sale-completion-date`,
      skipTo: `${sectionPath}/purchaser-code`
    }, {
      currentPath: `${sectionPath}/purchaser-code`,
      skipTo: `${sectionPath}/property-reference`
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
      // Lead tenant
      'lead-tenant/age',
      'lead-tenant/gender',
      'lead-tenant/nationality',
      'lead-tenant/working-situation',
      // Tenant 2
      'tenant-2/known',
      'tenant-2/relationship-to-lead-tenant',
      'tenant-2/age',
      'tenant-2/gender',
      'tenant-2/working-situation',
      // Tenant 3
      'tenant-3/known',
      'tenant-3/relationship-to-lead-tenant',
      'tenant-3/age',
      'tenant-3/gender',
      'tenant-3/working-situation',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/lead-tenant/working-situation`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('number-in-household'),
      values: ['1']
    }, {
      currentPath: `${sectionPath}/tenant-2/known`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('tenant-2-known'),
      values: ['false']
    }, {
      currentPath: `${sectionPath}/tenant-2/working-situation`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('number-in-household'),
      values: ['2']
    }, {
      currentPath: `${sectionPath}/tenant-3/known`,
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
    group: 'household'
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

  // General needs
  const tenancyInformation = {
    id: 'tenancy-information',
    title: 'Tenancy information',
    group: 'tenancy',
    paths: getPaths('tenancy-information', [
      'is-starter',
      'type-of-tenancy',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/type-of-tenancy`,
      forkPath: `${sectionPath}/fixed-term-length`,
      storedData: keyPathRoot.concat('type-of-tenancy'),
      values: ['fixed-secure', 'fixed-ast']
    }, {
      currentPath: `${sectionPath}/fixed-term-length`,
      skipTo: `${sectionPath}/check-your-answers`
    }]
  }

  // Supported housing
  const tenancyInformationSupportedHousing = {
    id: 'tenancy-information-supported-housing',
    title: 'Tenancy information',
    group: 'tenancy',
    paths: getPaths('tenancy-information-supported-housing', [
      'is-starter',
      'type-of-tenancy',
      'sheltered-accommodation',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/type-of-tenancy`,
      forkPath: `${sectionPath}/fixed-term-length`,
      storedData: keyPathRoot.concat('type-of-tenancy'),
      values: ['fixed-secure', 'fixed-ast']
    }, {
      currentPath: `${sectionPath}/fixed-term-length`,
      skipTo: `${sectionPath}/sheltered-accommodation`
    }]
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
      'postcode',
      'local-authority',
      'is-re-let',
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
      forkPath: `${sectionPath}/is-re-let`,
      storedData: keyPathRoot.concat('postcode-known'),
      values: ['true']
    }, {
      currentPath: `${sectionPath}/is-re-let`,
      forkPath: `${sectionPath}/reason-for-vacancy`,
      storedData: keyPathRoot.concat('is-re-let'),
      values: ['relet']
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
      'postcode',
      'local-authority',
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
      'is-re-let',
      'type-of-let',
      'reason-for-vacancy',
      'is-adapted',
      'times-previously-offered',
      'void-date',
      'repairs',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/is-re-let`,
      forkPath: `${sectionPath}/reason-for-vacancy`,
      storedData: keyPathRoot.concat('is-re-let'),
      values: ['relet']
    }]
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
    ...(!isSupportedHousing ? [tenancyInformation] : []),
    ...(isSupportedHousing ? [tenancyInformationSupportedHousing] : []),
    ...(!isSupportedHousing && !isRenewal ? [propertyInformation] : []),
    ...(!isSupportedHousing && isRenewal ? [propertyInformationRenewal] : []),
    ...(isSupportedHousing && !isRenewal ? [propertyInformationSupportedHousing] : []),
    finances,
    declaration
  ]
}
