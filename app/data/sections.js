export function sections (log) {
  const logId = log.id
  const logPath = `/logs/${logId}/`

  // Answers in ’Set up this log’ affect questions shown in task list
  let isSupportedHousing = false
  let isRenewal = false
  if (log.setup) {
    isSupportedHousing = log.setup['type-of-need'] === 'supported'
    isRenewal = log.setup['letting-renewal'] === 'true'
  }

  /**
   * Set up this lettings log
   */
  const setup = {
    id: 'setup',
    title: 'Set up this lettings log',
    group: 'before-you-start',
    paths: {
      [`${logPath}setup/organisation`]: {},
      [`${logPath}setup/type-of-need`]: {
        [`${logPath}setup/letting-renewal`]: {
          data: `logs.${logId}.setup['type-of-need']`,
          value: 'general'
        }
      },
      [`${logPath}setup/scheme`]: {},
      [`${logPath}setup/scheme-location`]: {},
      [`${logPath}setup/letting-renewal`]: {},
      [`${logPath}setup/letting-start-date`]: {},
      [`${logPath}setup/type-of-rent`]: {},
      [`${logPath}setup/tenant-code`]: {},
      [`${logPath}setup/property-reference`]: {},
      [`${logPath}setup/check-your-answers`]: {}
    }
  }

  /**
   * Tenancy information
   */
  const tenancyInformation = {
    id: 'tenancy-information',
    title: 'Tenancy information',
    group: 'tenancy',
    paths: {
      [`${logPath}tenancy-information/is-joint`]: {},
      [`${logPath}tenancy-information/is-starter`]: {},
      [`${logPath}tenancy-information/type-of-tenancy`]: {
        [`${logPath}tenancy-information/fixed-term-length`]: {
          data: `logs.${logId}['tenancy-information']['type-of-tenancy']`,
          values: [
            'Assured Shorthold Tenancy (AST) – fixed term',
            'Secure – fixed term'
          ]
        },
        [`${logPath}tenancy-information/sheltered-accommodation`]: {
          data: `logs.${logId}.setup['type-of-need']`,
          value: 'supported'
        },
        [`${logPath}tenancy-information/check-your-answers`]: {
          data: `logs.${logId}['tenancy-information']['type-of-tenancy']`,
          excludedValues: [
            'Assured Shorthold Tenancy (AST) – fixed term',
            'Secure – fixed term'
          ]
        }
      },
      [`${logPath}tenancy-information/fixed-term-length`]: {},
      [`${logPath}tenancy-information/sheltered-accommodation`]: {},
      [`${logPath}tenancy-information/check-your-answers`]: {}
    }
  }

  /**
   * Property information
   */
  const nextPath = isRenewal ? 'type-of-unit' : 'is-re-let'
  const propertyInformation = {
    id: 'property-information',
    title: 'Property information',
    group: 'tenancy',
    paths: isSupportedHousing
      ? { // Supported housing
          [`${logPath}property-information/is-re-let`]: {
            // SKIP: Don’t need let type if re-let
            [`${logPath}property-information/reason-for-vacancy`]: {
              data: `logs.${logId}['property-information']['is-re-let']`,
              value: 'relet'
            }
          },
          [`${logPath}property-information/type-of-let`]: {},
          [`${logPath}property-information/reason-for-vacancy`]: {},
          [`${logPath}property-information/times-previously-offered`]: {},
          [`${logPath}property-information/void-date`]: {
            // SKIP: Don’t need repair information if new property
            [`${logPath}property-information/check-your-answers`]: {
              data: `logs.${logId}['property-information']['reason-for-vacancy']`,
              value: 'newprop'
            }
          },
          [`${logPath}property-information/repairs`]: {},
          [`${logPath}property-information/check-your-answers`]: {}
        }
      : { // General needs
          [`${logPath}property-information/postcode`]: {
            // SKIP: Don’t need local authority if postcode known
            [`${logPath}property-information/${nextPath}`]: {
              data: `logs.${logId}['property-information']['postcode-known']`,
              value: 'true'
            }
          },
          [`${logPath}property-information/local-authority`]: {},
          [`${logPath}property-information/is-re-let`]: {
            // SKIP: Don’t need let type if re-let
            [`${logPath}property-information/reason-for-vacancy`]: {
              data: `logs.${logId}['property-information']['is-re-let']`,
              value: 'relet'
            }
          },
          [`${logPath}property-information/type-of-let`]: {},
          [`${logPath}property-information/reason-for-vacancy`]: {},
          [`${logPath}property-information/times-previously-offered`]: {},
          [`${logPath}property-information/type-of-unit`]: {},
          [`${logPath}property-information/type-of-building`]: {},
          [`${logPath}property-information/is-adapted`]: {},
          [`${logPath}property-information/number-of-bedrooms`]: {},
          [`${logPath}property-information/void-date`]: {
            // SKIP: Don’t need repair information if new property
            [`${logPath}property-information/check-your-answers`]: {
              data: `logs.${logId}['property-information']['reason-for-vacancy']`,
              value: 'newprop'
            }
          },
          [`${logPath}property-information/repairs`]: {},
          [`${logPath}property-information/check-your-answers`]: {}
        }
  }

  /**
   * Household characteristics
   */
  const householdCharacteristics = {
    id: 'household-characteristics',
    title: 'Household characteristics',
    group: 'household',
    paths: {
      [`${logPath}household-characteristics/privacy-notice`]: {},
      [`${logPath}household-characteristics/number-in-household`]: {},
      [`${logPath}household-characteristics/lead-tenant/age`]: {},
      [`${logPath}household-characteristics/lead-tenant/gender`]: {},
      [`${logPath}household-characteristics/lead-tenant/ethnic-group`]: {},
      [`${logPath}household-characteristics/lead-tenant/ethnic-background`]: {},
      [`${logPath}household-characteristics/lead-tenant/nationality`]: {},
      [`${logPath}household-characteristics/lead-tenant/working-situation`]: {
        // SKIP: Go to check your answers if only one member in household
        [`${logPath}household-characteristics/check-your-answers`]: {
          data: `logs.${logId}['household-characteristics']['number-in-household']`,
          value: '1'
        }
      },
      [`${logPath}household-characteristics/person-2/known`]: {
        // SKIP: Go to check your answers if details for person 2 not known
        [`${logPath}household-characteristics/check-your-answers`]: {
          data: `logs.${logId}['household-characteristics']['person-2-known']`,
          value: 'false'
        }
      },
      [`${logPath}household-characteristics/person-2/relationship-to-lead-tenant`]: {},
      [`${logPath}household-characteristics/person-2/age`]: {},
      [`${logPath}household-characteristics/person-2/gender`]: {},
      [`${logPath}household-characteristics/person-2/working-situation`]: {
        // SKIP: Go to check your answers if only 2 members in household
        [`${logPath}household-characteristics/check-your-answers`]: {
          data: `logs.${logId}['household-characteristics']['number-in-household']`,
          value: '2'
        }
      },
      [`${logPath}household-characteristics/person-3/known`]: {
        // SKIP: Go to check your answers if details for person 3 not known
        [`${logPath}household-characteristics/check-your-answers`]: {
          data: `logs.${logId}['household-characteristics']['person-3-known']`,
          value: 'false'
        }
      },
      [`${logPath}household-characteristics/person-3/relationship-to-lead-tenant`]: {},
      [`${logPath}household-characteristics/person-3/age`]: {},
      [`${logPath}household-characteristics/person-3/gender`]: {},
      [`${logPath}household-characteristics/person-3/working-situation`]: {},
      [`${logPath}household-characteristics/check-your-answers`]: {}
    }
  }

  /**
   * Household situation
   */
  const householdSituation = {
    id: 'household-situation',
    title: 'Household situation',
    group: 'household',
    paths: {
      [`${logPath}household-situation/time-lived-in-area`]: {
        // SKIP: Renewal infers time on waiting list as ‘Less than 1 year’
        [`${logPath}household-situation/reason-for-leaving-last-settled-home`]: {
          data: `logs.${logId}.setup['letting-renewal']`,
          value: 'true'
        }
      },
      [`${logPath}household-situation/time-on-waiting-list`]: {},
      [`${logPath}household-situation/reason-for-leaving-last-settled-home`]: {
        // SKIP: Don’t need previous accommodation if general needs
        [`${logPath}household-situation/postcode`]: {
          data: `logs.${logId}.setup['type-of-need']`,
          value: 'general'
        }
      },
      [`${logPath}household-situation/previous-accommodation`]: {
        // SKIP: Renewal infers previous homelessness value as ‘No’
        [`${logPath}household-situation/postcode`]: {
          data: `logs.${logId}.setup['letting-renewal']`,
          value: 'true'
        }
      },
      [`${logPath}household-situation/previous-homelessness`]: {},
      [`${logPath}household-situation/postcode`]: {
        // SKIP: Don’t need local authority if postcode known
        [`${logPath}household-situation/given-reasonable-preference`]: {
          data: `logs.${logId}['household-situation']['postcode-known']`,
          value: 'true'
        }
      },
      [`${logPath}household-situation/local-authority`]: {},
      [`${logPath}household-situation/given-reasonable-preference`]: {
        // SKIP: Don’t need reason as reasonable preference not given
        [`${logPath}household-situation/allocation`]: {
          data: `logs.${logId}['household-situation']['given-reasonable-preference']`,
          value: ['false', 'unknown']
        }
      },
      [`${logPath}household-situation/reasonable-preference`]: {},
      [`${logPath}household-situation/allocation`]: {
        // SKIP: Renewal infers referral value as ‘Internal transfer’
        [`${logPath}household-situation/check-your-answers`]: {
          data: `logs.${logId}.setup['letting-renewal']`,
          value: 'true'
        }
      },
      [`${logPath}household-situation/referral`]: {},
      [`${logPath}household-situation/check-your-answers`]: {}
    }
  }

  /**
   * Household needs
   */
  const householdNeeds = {
    id: 'household-needs',
    title: 'Household needs',
    group: 'household',
    paths: {
      [`${logPath}household-needs/armed-forces`]: {
        // SKIP: Don’t ask about armed forces if nobody in household served
        [`${logPath}household-needs/pregnant`]: {
          data: `logs.${logId}['household-needs']['armed-forces']`,
          values: ['false', 'unknown', 'prefers-not-to-say']
        }
      },
      [`${logPath}household-needs/armed-forces-still-serving`]: {},
      [`${logPath}household-needs/armed-forces-seriously-injured`]: {},
      [`${logPath}household-needs/pregnant`]: {},
      [`${logPath}household-needs/access-needs`]: {},
      [`${logPath}household-needs/health-condition`]: {
        // SKIP: Don’t need to ask about affects of any health condition
        [`${logPath}household-needs/check-your-answers`]: {
          data: `logs.${logId}['household-needs']['health-condition']`,
          values: ['false', 'prefers-not-to-say']
        }
      },
      [`${logPath}household-needs/health-affects`]: {},
      [`${logPath}household-needs/check-your-answers`]: {}
    }
  }

  /**
   * Finances
   */
  const finances = {
    id: 'finances',
    title: 'Income, benefits and outgoings',
    group: 'finances',
    paths: {
      [`${logPath}finances/income-known`]: {
        // SKIP: Don’t ask for income value if income unknown
        [`${logPath}finances/income-benefits`]: {
          data: `logs.${logId}['finances']['income-known']`,
          excludedValue: 'true'
        }
      },
      [`${logPath}finances/income-value`]: {},
      [`${logPath}finances/income-benefits`]: {},
      [`${logPath}finances/income-benefits-portion`]: {
        [`${logPath}finances/outgoings-period`]: {
          // SKIP: Don’t ask if outgoings include rent if general needs
          data: `logs.${logId}.setup['type-of-need']`,
          value: 'general'
        }
      },
      [`${logPath}finances/outgoings-includes-rent`]: {
        // SKIP: Don’t ask about outgoings if rent not charged
        [`${logPath}finances/check-your-answers`]: {
          data: `logs.${logId}['finances']['outgoings-includes-rent']`,
          value: 'false'
        }
      },
      [`${logPath}finances/outgoings-period`]: {
        [`${logPath}finances/outgoings-value`]: {
          // SKIP: Don’t ask if outgoings include care home if general needs
          data: `logs.${logId}.setup['type-of-need']`,
          value: 'general'
        }
      },
      [`${logPath}finances/outgoings-includes-care-home`]: {},
      [`${logPath}finances/outgoings-value`]: {},
      [`${logPath}finances/outgoings-value-check`]: {
        // SKIP: Don’t ask about outgoings after benefits if no benefits
        [`${logPath}finances/check-your-answers`]: {
          data: `logs.${logId}['finances']['income-benefits']`,
          values: [
            'None',
            'Neither',
            'Don’t know',
            'Tenant prefers not to say'
          ]
        }
      },
      [`${logPath}finances/outgoings-after-benefits`]: {
        // SKIP: Don’t ask outstanding value if no outgoings after benefits
        [`${logPath}finances/check-your-answers`]: {
          data: `logs.${logId}['finances']['outgoings-after-benefits']`,
          value: 'false'
        }
      },
      [`${logPath}finances/outgoings-outstanding`]: {},
      [`${logPath}finances/check-your-answers`]: {}
    }
  }

  return [
    setup,
    propertyInformation,
    tenancyInformation,
    householdCharacteristics,
    householdNeeds,
    householdSituation,
    finances
  ]
}
