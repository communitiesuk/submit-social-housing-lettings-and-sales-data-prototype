import { faker } from '@faker-js/faker'
import { generateDataset } from '../app/utils.js'
import localAuthorities from '../app/datasets/local-authorities.js'
import seedSchemes from '../app/datasets/seed-schemes.js'
import fixedSchemes from './fixed-schemes.js'

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
    let name, clientGroup1, clientGroup2, type, typeOfSupport
    switch (preset) {
      case 1:
        // Rough sleepers
        name = `${faker.address.city()}${faker.random.arrayElement([
          ' Center',
          ' Action on Homelessness'
        ])}`
        type = 'direct-access-hostel'
        clientGroup1 = 'homeless-families'
        clientGroup2 = 'homeless-individuals'
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
        clientGroup1 = 'young-at-risk'
        clientGroup2 = 'young-leaving-care'
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
        clientGroup1 = 'older-people'
        clientGroup2 = 'false'
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
        clientGroup1 = 'learning-disabilities'
        clientGroup2 = 'mental-health'
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
        clientGroup1 = 'physical-disabilities'
        clientGroup2 = 'false'
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
        clientGroup1 = 'alcohol'
        clientGroup2 = 'drugs'
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
        // Use string for object name
        // Using integer means form gets submitted as an array and deletes
        // other objects
        const id = `p${i + 1}`
        properties[id] = {
          postcode: faker.address.zipCode(),
          address: `${faker.datatype.number({ min: 1, max: 201 })} ${faker.random.arrayElement(streetNames)}`,
          'local-authority': faker.random.arrayElement(localAuthorities),
          'type-of-unit': faker.random.arrayElement([
            'bungalow',
            'flat',
            'flat-common-facilities',
            'house',
            'shared-flat',
            'shared-house-or-hostel'
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
      name,
      confidential: faker.datatype.boolean().toString(),
      organisationId: value.organisationId,
      agentId: faker.random.arrayElement([
        'CHILD1',
        'CHILD2',
        value.organisationId
      ]),
      type,
      'registered-home': faker.random.arrayElement([
        'nursing',
        'personal',
        'part-registered',
        'false'
      ]),
      'primary-client-group': clientGroup1,
      'has-secondary-client-group': clientGroup2 !== 'false',
      'secondary-client-group': clientGroup2,
      'type-of-support': typeOfSupport,
      'intended-stay': faker.random.arrayElement([
        'very-short',
        'short',
        'medium',
        'permanent'
      ]),
      'start-date': faker.date.past(),
      'end-date-known': hasEndDate.toString(),
      'end-date': hasEndDate ? faker.date.future() : false,
      properties: generateProperties(faker.datatype.number({
        min: 1,
        max: 9
      }))
    }

    const schemePropertyCount = Object.entries(schemes[id].properties).length
    schemes[id].units = faker.datatype.number({
      min: schemePropertyCount,
      max: schemePropertyCount + 20
    })
  })

  return {
    ...schemes,
    ...fixedSchemes
  }
}

generateDataset(generateSchemes(), 'schemes')
