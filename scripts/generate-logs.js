import { faker } from '@faker-js/faker'
import { generateDataset, generateUniqueId } from '../app/utils.js'

faker.locale = 'en_GB'

const generateLogs = () => {
  const logs = {}
  const range = Array.from(Array(200).keys())

  for (const i of range) {
    const id = generateUniqueId() + i
    const isRenewal = faker.datatype.boolean()
    const typeOfNeed = faker.helpers.arrayElement(['general', 'supported'])
    const typeOfTenancy = faker.helpers.arrayElement([
      'Assured Shorthold Tenancy (AST) – fixed term',
      'Assured – lifetime',
      'Secure – fixed term',
      'Secure – lifetime',
      'Licence agreement'
    ])

    // Scheme
    logs[id] = {
      type: 'lettings',
      created: faker.date.recent(),
      createdBy: faker.helpers.arrayElement([
        'DP-AGENT',
        'DC-AGENT',
        'DP-OWNER',
        'DC-OWNER',
        'DP-OWNER_AGENT',
        'DC-OWNER_AGENT'
      ]),
      updated: faker.date.recent(),
      updatedBy: faker.helpers.arrayElement([
        'DP-AGENT',
        'DC-AGENT',
        'DP-OWNER',
        'DC-OWNER',
        'DP-OWNER_AGENT',
        'DC-OWNER_AGENT'
      ]),
      setup: {
        agent: faker.helpers.arrayElement([
          'AGENT',
          'OWNER_AGENT'
        ]),
        owner: faker.helpers.arrayElement([
          'OWNER',
          'OWNER_AGENT'
        ]),
        'type-of-need': typeOfNeed,
        'letting-renewal': isRenewal.toString(),
        'type-of-rent': faker.helpers.arrayElement([
          'Affordable Rent',
          'Rent to Buy',
          'Social Rent'
        ]),
        'letting-start-date': faker.date.past(2),
        'tenant-code': faker.datatype.hexadecimal(8).toUpperCase(),
        'property-reference': faker.datatype.hexadecimal(8).toUpperCase(),
        completed: 'true'
      },
      'household-characteristics': {
        'number-in-household': 2,
        'privacy-notice': faker.datatype.boolean().toString(),
        'lead-tenant': {
          age: faker.datatype.number({ min: 18, max: 99 }),
          'age-known': 'true',
          'ethnic-group': 'white',
          'ethnic-background': 'white-british',
          gender: faker.helpers.arrayElement([
            'female',
            'male',
            'other',
            'prefers-not-to-say'
          ]),
          nationality: 'UK national resident in UK',
          'working-situation': faker.datatype.number({ min: 0, max: 9 })
        },
        'person-2-known': 'true',
        'person-2': {
          age: faker.datatype.number({ min: 18, max: 99 }),
          'age-known': 'true',
          gender: faker.helpers.arrayElement([
            'female',
            'male',
            'other',
            'prefers-not-to-say'
          ]),
          'relationship-to-lead-tenant': faker.helpers.arrayElement([
            '1',
            '2',
            '3',
            'prefers-not-to-say'
          ]),
          'working-situation': faker.datatype.number({ min: 0, max: 9 })
        },
        completed: 'true'
      },
      'household-situation': {
        'time-lived-in-area': faker.helpers.arrayElement([
          '1', '2', '5', '7', '8', '9', '10', 'unknown'
        ]),
        ...(isRenewal && {
          'time-lived-on-waiting-list': faker.helpers.arrayElement([
            '2', '5', '7', '8', '9', '10', 'unknown'
          ])
        }),
        allocation: faker.helpers.arrayElements([
          'cbl', 'cap', 'chr'
        ]),
        'given-reasonable-preference': faker.datatype.boolean().toString(),
        ...(!isRenewal && {
          'postcode-known': 'true'
        }),
        ...(!isRenewal && {
          postcode: faker.address.zipCode()
        }),
        'reason-for-leaving-last-settled-home': faker.helpers.arrayElement([
          '40', '41', '42', '43', '1', '45', '44', '2', '4', '9', '46', '8', '16', '17', '7', '31', '10', '11', '35', '37', '38', '39', '36', '34', '12', '13', '14', '18', '19', '30', '29', 'other', 'unknown', 'prefers-not-to-say'
        ]),
        completed: 'true'
      },
      'household-needs': {
        'armed-forces': 'false',
        pregnant: 'false',
        'has-access-needs': 'false',
        'health-condition': 'false',
        completed: 'true'
      },
      'property-information': {
        'is-adapted': 'false',
        'number-of-bedrooms': faker.datatype.number({ min: 1, max: 9 }),
        'postcode-known': 'true',
        postcode: faker.address.zipCode(),
        repairs: 'false',
        'type-of-building': 'purpose-built',
        'type-of-unit': 'flat',
        'void-date': { day: '12', month: '11', year: '2022' },
        completed: 'true'
      },
      'tenancy-information': faker.helpers.arrayElement([
        {
          'is-joint': faker.datatype.boolean().toString(),
          'is-starter': faker.datatype.boolean().toString(),
          'type-of-tenancy': typeOfTenancy,
          'fixed-term-length': typeOfTenancy.includes('fixed')
            ? faker.datatype.number({ min: 1, max: 10 })
            : false,
          'sheltered-accommodation': typeOfNeed === 'supported'
            ? faker.helpers.arrayElement([
              'Yes – extra care housing',
              'Yes – specialist retirement housing',
              'No',
              'Don’t know'
            ])
            : false,
          completed: 'true'
        }, {}
      ]),
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
        'outgoings-outstanding-known': 'true',
        'outgoings-outstanding': 15,
        completed: 'true'
      }
    }
  }

  return logs
}

generateDataset(generateLogs(), 'logs')
