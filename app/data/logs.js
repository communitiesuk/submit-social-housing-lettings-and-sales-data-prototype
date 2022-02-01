export default {
  EX001: {
    type: 'lettings',
    postcode: 'BN17 6RJ',
    submitted: true,
    updated: '2021-07-29',
    updatedBy: {
      name: 'Daisy Perkins'
    },
    setup: {
      'organisation-manager': 'CHILD1',
      'organisation-owner': 'PARENT1',
      'type-of-need': 'general',
      'letting-renewal': 'true',
      'type-of-rent': 'Affordable Rent',
      'letting-start-date': { day: '12', month: '1', year: '2021' },
      'tenant-code': '298739',
      'property-reference': 'RT45657',
      completed: 'true'
    },
    'household-characteristics': {
      'number-in-household': 2,
      'lead-tenant': {
        age: 45,
        'age-known': 'true',
        'ethnic-group': 'white',
        'ethnic-background': 'white-british',
        gender: 'male',
        nationality: 'UK national resident in UK',
        'working-situation': '3'
      },
      'person-2-known': 'true',
      'person-2': {
        age: 42,
        'age-known': 'true',
        gender: 'female',
        'relationship-to-lead-tenant': '1',
        'working-situation': '8'
      },
      completed: 'true'
    },
    'household-situation-renewal': {
      allocation: ['cbl'],
      'given-reasonable-preference': 'false',
      'local-authority-known': 'false',
      'postcode-known': 'false',
      postcode: '',
      'reason-for-leaving-last-settled-home': '40',
      'time-lived-in-area': '2',
      completed: 'true'
    },
    'household-needs': {
      'armed-forces': 'false',
      pregnant: 'false',
      'access-needs': ['g'],
      'health-condition': 'false',
      completed: 'true'
    },
    'property-information-renewal': {
      'is-adapted': 'false',
      'number-of-bedrooms': '2',
      'postcode-known': 'true',
      postcode: 'BN17 6RJ',
      repairs: 'false',
      'type-of-building': 'purpose-built',
      'type-of-unit': 'flat',
      'void-date': { day: '12', month: '11', year: '2022' },
      completed: 'true'
    },
    'tenancy-information': {
      'is-joint': 'false',
      'is-starter': 'false',
      'type-of-tenancy': 'Fixed term – Assured Shorthold Tenancy (AST)',
      'fixed-term-length': 5,
      completed: 'true'
    },
    finances: {
      'income-known': 'true',
      'income-value': 250,
      'income-period': 'weekly',
      'income-benefits': 'Housing benefit',
      'income-benefits-portion': 'some',
      'outgoings-includes-rent': 'true',
      'outgoings-includes-care-home': 'false',
      'outgoings-period': 'weekly-50',
      'outgoings-rent': 200,
      'outgoings-service-charge': 15,
      'outgoings-personal-charge': 0,
      'outgoings-support-charge': 0,
      'outgoings-value': 215,
      'outgoings-after-benefits': 'true',
      'outgoings-outstanding': 15,
      completed: 'true'
    },
    submit: {
      completed: 'true'
    }
  },
  BZ787: {
    type: 'lettings',
    updated: '2021-07-29',
    updatedBy: {
      name: 'Daisy Perkins'
    },
    setup: {
      'organisation-manager': 'PARENT1',
      'organisation-owner': 'PARENT1',
      'type-of-need': 'general',
      'letting-renewal': 'false',
      'type-of-rent': 'Affordable Rent',
      'letting-start-date': { day: '12', month: '1', year: '2021' },
      'tenant-code': 'Gen needs/!renewal',
      'property-reference': 'RT45657',
      completed: 'true'
    }
  },
  BZ766: {
    type: 'lettings',
    updated: '2021-07-29',
    updatedBy: {
      name: 'Daisy Perkins'
    },
    setup: {
      'organisation-manager': 'PARENT1',
      'organisation-owner': 'PARENT1',
      'type-of-need': 'general',
      'letting-renewal': 'true',
      'type-of-rent': 'Affordable Rent',
      'letting-start-date': { day: '12', month: '1', year: '2021' },
      'tenant-code': 'Gen needs/renewal',
      'property-reference': 'RT45657',
      completed: 'true'
    }
  },
  BZ765: {
    type: 'lettings',
    updated: '2021-07-29',
    updatedBy: {
      name: 'Daisy Perkins'
    },
    setup: {
      schemeId: 'EXAMPLE',
      'organisation-manager': 'PARENT1',
      'organisation-owner': 'PARENT1',
      'type-of-need': 'supported',
      'letting-renewal': 'false',
      'type-of-rent': 'Affordable Rent',
      'letting-start-date': { day: '12', month: '1', year: '2021' },
      'tenant-code': 'Sup hou/!renewal',
      'property-reference': 'RT45657',
      completed: 'true'
    }
  },
  BZ112: {
    type: 'lettings',
    updated: '2021-07-29',
    updatedBy: {
      name: 'Daisy Perkins'
    },
    setup: {
      schemeId: 'EXAMPLE',
      'organisation-manager': 'PARENT1',
      'organisation-owner': 'PARENT1',
      'type-of-need': 'supported',
      'letting-renewal': 'true',
      'type-of-rent': 'Affordable Rent',
      'letting-start-date': { day: '12', month: '1', year: '2021' },
      'tenant-code': 'Sup hou/renewal',
      'property-reference': 'RT45657',
      completed: 'true'
    },
    'property-information-supported-housing-renewal': {
      'property-reference': '12345',
      completed: 'true'
    }
  }
}
