import { faker } from '@faker-js/faker'
import { generateDataset } from '../app/utils.js'
import localAuthorities from '../app/datasets/local-authorities.js'

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
  const range = Array.from(Array(100).keys())

  for (const i of range) {
    const id = i + 1000
    const preset = faker.datatype.number({ min: 1, max: 6 })

    // Scheme values
    let name, clientGroup1, type, typeOfSupport
    let clientGroup2 = false

    switch (preset) {
      case 1:
        // Rough sleepers
        name = `${faker.address.city()}${faker.helpers.arrayElement([
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
        name = `${faker.address.city()}${faker.helpers.arrayElement([
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
        name = `${faker.address.city()}${faker.helpers.arrayElement([
          ' Care',
          ' Nursing',
          ' Support'
        ])}`
        type = 'older-people'
        clientGroup1 = 'older-people'
        typeOfSupport = 'medium'
        break
      case 4:
        // Mental health
        name = `${faker.address.city()}${faker.helpers.arrayElement([
          ' Care',
          ' Independent Living',
          ' Point',
          ' Supported Living'
        ])}`
        type = 'other'
        clientGroup1 = 'learning-disabilities'
        clientGroup2 = 'mental-health'
        typeOfSupport = 'medium'
        break
      case 5:
        // Physical health
        name = `${faker.address.city()}${faker.helpers.arrayElement([
          ' Care',
          ' House',
          ' Nursing'
        ])}`
        type = 'other'
        clientGroup1 = 'physical-disabilities'
        typeOfSupport = 'nursing'
        break
      case 6:
        // Other
        name = `${faker.address.city()}${faker.helpers.arrayElement([
          ' Center',
          ' Close',
          ' House'
        ])}`
        type = 'other'
        clientGroup1 = 'alcohol'
        clientGroup2 = 'drugs'
        typeOfSupport = 'medium'
    }

    // Scheme locations
    const generateLocations = (count) => {
      const locations = {}

      for (let i = 0; i < count; i++) {
        // Use string for object name
        // Using integer means form gets submitted as an array and deletes
        // other objects
        const id = `l${i + 1}`
        locations[id] = {
          postcode: faker.address.zipCode(),
          name: `${faker.datatype.number({
            min: 1,
            max: 150
          })} ${faker.helpers.arrayElement(streetNames)}`,
          'local-authority': faker.helpers.arrayElement(localAuthorities).name,
          units: faker.datatype.number({
            min: 1,
            max: 100
          }),
          'type-of-unit': faker.helpers.arrayElement([
            'bungalow',
            'flat',
            'flat-common-facilities',
            'house',
            'shared-flat',
            'shared-house-or-hostel'
          ]),
          'is-adapted': faker.datatype.boolean().toString()
        }
      }

      return locations
    }

    // Scheme
    schemes[id] = {
      id,
      created: faker.date.past(),
      deactivated: faker.datatype.boolean(),
      name,
      confidential: faker.datatype.boolean().toString(),
      ownerId: faker.helpers.arrayElement([
        'OWNER',
        'OWNER_AGENT'
      ]),
      agentId: faker.helpers.arrayElement([
        'AGENT',
        'OWNER_AGENT'
      ]),
      type,
      'registered-home': faker.helpers.arrayElement([
        'nursing',
        'personal',
        'part-registered',
        'false'
      ]),
      'primary-client-group': clientGroup1,
      'has-secondary-client-group': clientGroup2 ? 'true' : 'false',
      ...(clientGroup2 && { 'secondary-client-group': clientGroup2 }),
      'type-of-support': typeOfSupport,
      'intended-stay': faker.helpers.arrayElement([
        'very-short',
        'short',
        'medium',
        'permanent'
      ]),
      locations: generateLocations(faker.datatype.number({
        min: 1,
        max: 150
      }))
    }
  }

  return schemes
}

generateDataset(generateSchemes(), 'schemes')
