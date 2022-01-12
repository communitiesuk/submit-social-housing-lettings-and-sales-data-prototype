import _ from 'lodash'

export function sections (log) {
  const logPath = `/logs/${log.id}`

  const getPaths = (sectionId, paths) => {
    return paths.map(path => `${logPath}/${sectionId}/${path}`)
  }

  /**
   * Tailor your log
   */
  const aboutThisLog = {
    id: 'tailor-log',
    title: 'Tailor your log',
    group: 'before-you-start',
    paths: getPaths('tailor-log', [
      'gdpr',
      'letting-or-sale',
      'organisation',
      'type-of-need',
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
      currentPath: `${sectionPath}/type-of-need`,
      forkPath: `${sectionPath}/scheme`,
      storedData: keyPathRoot.concat('type-of-need'),
      values: ['supported']
    }, {
      currentPath: `${sectionPath}/scheme`,
      skipTo: `${sectionPath}/letting-renewal`
    }, {
      currentPath: `${sectionPath}/letting-or-sale`,
      forkPath: `${sectionPath}/sale-completion-date`,
      storedData: keyPathRoot.concat('letting-or-sale'),
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
      // Person 2
      'person-2/known',
      'person-2/relationship-to-lead-tenant',
      'person-2/age',
      'person-2/gender',
      'person-2/working-situation',
      // Person 3
      'person-3/known',
      'person-3/relationship-to-lead-tenant',
      'person-3/age',
      'person-3/gender',
      'person-3/working-situation',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/lead-tenant/working-situation`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('number-in-household'),
      values: ['1']
    }, {
      currentPath: `${sectionPath}/person-2/known`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('person-2-known'),
      values: ['false']
    }, {
      currentPath: `${sectionPath}/person-2/working-situation`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('number-in-household'),
      values: ['2']
    }, {
      currentPath: `${sectionPath}/person-3/known`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('person-3-known'),
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
    group: 'household',
    paths: getPaths('household-needs', [
      'armed-forces',
      'armed-forces-still-serving',
      'armed-forces-seriously-injured',
      'pregnant',
      'access-needs',
      'health-condition',
      'health-affects',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/armed-forces`,
      forkPath: `${sectionPath}/pregnant`,
      storedData: keyPathRoot.concat('armed-forces'),
      values: ['false', 'unknown', 'prefers-not-to-say']
    }, {
      currentPath: `${sectionPath}/health-condition`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('health-condition'),
      values: ['false', 'prefers-not-to-say']
    }]
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
      'outgoings-value-check',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot) => [{
      currentPath: `${sectionPath}/income-period`,
      forkPath: `${sectionPath}/income-benefits`,
      storedData: keyPathRoot.concat('income-period'),
      values: ['prefers-not-to-say']
    }, {
      currentPath: `${sectionPath}/outgoings-value-check`,
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

  const financesSupportedHousing = {
    id: 'finances-supported-housing',
    title: 'Income, benefits and outgoings',
    group: 'finances',
    paths: getPaths('finances-supported-housing', [
      'income-period',
      'income-value',
      'income-benefits',
      'income-benefits-portion',
      'outgoings-includes-rent',
      'outgoings-period',
      'outgoings-includes-care-home',
      'outgoings-value',
      'outgoings-value-check',
      'check-your-answers'
    ]),
    forks: (sectionPath, keyPathRoot, req) => [{
      currentPath: `${sectionPath}/income-period`,
      forkPath: `${sectionPath}/income-benefits`,
      storedData: keyPathRoot.concat('income-period'),
      values: ['prefers-not-to-say']
    }, {
      currentPath: `${sectionPath}/outgoings-includes-rent`,
      forkPath: `${sectionPath}/check-your-answers`,
      storedData: keyPathRoot.concat('outgoings-includes-rent'),
      values: ['false']
    }, {
      currentPath: `${sectionPath}/outgoings-includes-care-home`,
      forkPath: (value) => {
        const { data } = req.session
        const incomeBenefits = _.get(data, keyPathRoot.concat('income-benefits'))
        const hasBenefits = !['none', 'unknown', 'prefers-not-to-say'].includes(incomeBenefits)
        if (value === 'false') {
          // Not care home accommodation
          return `${sectionPath}/outgoings-value`
        } else if (value === 'true' && hasBenefits) {
          // Care home accommodation and receives benefits
          return `${sectionPath}/outgoings-after-benefits`
        } else if (value === 'true' && !hasBenefits) {
          // Care home accommodation and not in receipt of benefits
          return `${sectionPath}/check-your-answers`
        }
      },
      storedData: keyPathRoot.concat('outgoings-includes-care-home'),
      values: ['true', 'false']
    }, {
      currentPath: `${sectionPath}/outgoings-value-check`,
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

  // Answers to questions in ‘Tailor your log’ affect questions shown in task list
  let isSupportedHousing
  let isRenewal
  if (log['tailor-log']) {
    isSupportedHousing = log['tailor-log']['type-of-need'] === 'supported'
    isRenewal = log['tailor-log']['letting-renewal'] === 'true'
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
    ...(!isSupportedHousing ? [finances] : []),
    ...(isSupportedHousing ? [financesSupportedHousing] : []),
    declaration
  ]
}
