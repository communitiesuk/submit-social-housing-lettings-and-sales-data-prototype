import { faker } from '@faker-js/faker'
import { generateDataset } from '../app/utils.js'
import localAuthorities from '../app/datasets/local-authorities.js'
import seedSchemes from '../app/datasets/seed-schemes.js'

faker.locale = 'en_GB'

const streetNames = [
  'Smithy Lane',
  'Middle Road',
  'Back Street',
  'Taylor Street',
  'Martin Close',
  'East Avenue',
  'Tudor Road',
  'Carlton Close',
  'Nelson Close',
  'Poplar Drive',
  'Howard Street',
  'Rectory Road',
  'Charlotte Street',
  'Broadway',
  'James Street',
  'Garden Street',
  'The Brambles',
  'Fairway',
  'West Way',
  'Woodstock Road'
]

const generateSchemes = () => {
  const schemes = {}

  Object.entries(seedSchemes).forEach(([key, value]) => {
    const id = faker.datatype.number({ min: 100, max: 999 })
    const preset = faker.datatype.number({ min: 1, max: 6 })

    // Scheme values
    let name, clientGroups, type, typeOfRegisteredHome, typeOfSupport, spGrant
    switch (preset) {
      case 1:
        // Rough sleepers
        name = `${faker.address.city()}${faker.random.arrayElement([
          ' Center',
          ' Action on Homelessness'
        ])}`
        type = 'direct-access-hostel'
        spGrant = 'false'
        clientGroups = ['homeless-families', 'homeless-individuals']
        typeOfRegisteredHome = 'false'
        typeOfSupport = 'low'
        break
      case 2:
        // Young people
        name = `${faker.address.city()}${faker.random.arrayElement([
          ' Center',
          ' Foyer',
          ' Point'
        ])}`
        type = 'foyer'
        spGrant = 'true'
        clientGroups = ['young-at-risk', 'young-leaving-care']
        typeOfRegisteredHome = 'false'
        typeOfSupport = 'low'
        break
      case 3:
        // Older people
        name = `${faker.address.city()}${faker.random.arrayElement([
          ' Care',
          ' Nursing',
          ' Support'
        ])}`
        type = 'older-people'
        spGrant = 'false'
        clientGroups = ['older-people']
        typeOfRegisteredHome = faker.random.arrayElement([
          'nursing',
          'personal',
          'part-registered',
          'false'
        ])
        typeOfSupport = faker.random.arrayElement([
          'low',
          'medium'
        ])
        break
      case 4:
        // Mental health
        name = `${faker.address.city()}${faker.random.arrayElement([
          ' Care',
          ' Independent Living',
          ' Point',
          ' Supported Living'
        ])}`
        type = 'other'
        spGrant = 'true'
        clientGroups = ['learning-disabilities', 'mental-health']
        typeOfRegisteredHome = 'false'
        typeOfSupport = faker.random.arrayElement([
          'low',
          'medium'
        ])
        break
      case 5:
        // Physical health
        name = `${faker.address.city()}${faker.random.arrayElement([
          ' Care',
          ' House',
          ' Nursing'
        ])}`
        type = 'other'
        spGrant = 'false'
        clientGroups = ['physical-disabilities']
        typeOfRegisteredHome = 'false'
        typeOfSupport = faker.random.arrayElement([
          'nursing',
          'low',
          'medium',
          'high'
        ])
        break
      case 6:
        // Other
        name = `${faker.address.city()}${faker.random.arrayElement([
          ' Center',
          ' Close',
          ' House'
        ])}`
        type = 'other'
        spGrant = faker.datatype.boolean().toString()
        clientGroups = ['alcohol', 'drugs']
        typeOfRegisteredHome = 'false'
        typeOfSupport = faker.random.arrayElements([
          'low',
          'medium',
          'high'
        ])
    }

    // Scheme date
    const hasEndDate = faker.datatype.boolean()

    // Scheme property
    const generateProperties = (count) => {
      const properties = {}

      for (let i = 0; i < count; i++) {
        properties[i] = {
          postcode: faker.address.zipCode(),
          address: `${faker.datatype.number({ min: 1, max: 201 })} ${faker.random.arrayElement(streetNames)}`,
          'local-authority': faker.random.arrayElement(localAuthorities),
          units: faker.datatype.number({ min: 1, max: 20 }),
          'type-of-unit': faker.random.arrayElement([
            'bungalow',
            'flat',
            'house',
            'shared-bungalow',
            'shared-flat',
            'shared-house',
            'other'
          ]),
          'is-adapted': faker.datatype.boolean().toString(),
          'type-of-building': faker.random.arrayElement([
            'converted',
            'purpose-built'
          ])
        }
      }

      return properties
    }

    // Scheme
    schemes[id] = {
      id,
      organisationId: value.organisationId,
      agentId: faker.random.arrayElement([
        'CHILD1',
        'CHILD2',
        value.organisationId
      ]),
      name,
      properties: generateProperties(faker.datatype.number({
        min: 1,
        max: 9
      })),
      confidential: faker.datatype.boolean().toString(),
      type,
      'client-groups': clientGroups,
      'type-of-support': typeOfSupport,
      'type-of-registered-home': typeOfRegisteredHome,
      'intended-stay': faker.random.arrayElement([
        'very-short',
        'short',
        'medium',
        'permanent'
      ]),
      'sp-grant': spGrant,
      'start-date': faker.date.past(),
      'end-date-known': hasEndDate.toString(),
      'end-date': hasEndDate ? faker.date.future() : false,
      completed: 'true'
    }
  })

  return schemes
}

generateDataset(generateSchemes(), 'schemes')
