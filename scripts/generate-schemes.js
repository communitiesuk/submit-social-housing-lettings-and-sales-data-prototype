import { faker } from '@faker-js/faker'
import { generateDataset } from '../app/utils.js'
import localAuthorities from '../app/datasets/local-authorities.js'

faker.locale = 'en_GB'

const generateSchemes = () => {
  const schemes = {}

  for (let i = 1; i <= 100; i++) {
    const id = faker.datatype.uuid()
    const preset = faker.datatype.number({ min: 1, max: 6 })

    // Scheme values
    let name, clientGroups, type, typeOfRegisteredHome, typeOfSupport, spGrant, isAdapted
    switch (preset) {
      case 1:
        // Rough sleepers
        name = `${faker.address.city()}${faker.helpers.randomize([
          '',
          ' Center',
          ' House'
        ])}`
        type = 'direct-access-hostel'
        spGrant = 'false'
        clientGroups = faker.random.arrayElements([
          'homeless-families',
          'homeless-individuals',
          'rough-sleepers'
        ])
        typeOfRegisteredHome = 'false'
        typeOfSupport = 'low'
        isAdapted = 'false'
        break
      case 2:
        // Young people
        name = `${faker.address.city()}${faker.helpers.randomize([
          '',
          ' Center',
          ' Foyer',
          ' House',
          ' Point'
        ])}`
        type = 'foyer'
        spGrant = 'true'
        clientGroups = faker.random.arrayElements([
          'mental-health',
          'teenage-parents',
          'young-at-risk',
          'young-leaving-care'
        ])
        typeOfRegisteredHome = 'false'
        typeOfSupport = 'low'
        isAdapted = 'false'
        break
      case 3:
        // Older people
        name = `${faker.address.city()}${faker.helpers.randomize([
          '',
          ' Care',
          ' Nursing Home',
          ' Point'
        ])}`
        type = 'older-people'
        spGrant = 'false'
        clientGroups = ['older-people']
        typeOfRegisteredHome = faker.helpers.randomize([
          'nursing',
          'personal',
          'part-registered',
          'false'
        ])
        typeOfSupport = faker.helpers.randomize([
          'low',
          'medium'
        ])
        isAdapted = faker.datatype.boolean().toString()
        break
      case 4:
        // Mental health
        name = `${faker.address.city()}${faker.helpers.randomize([
          '',
          ' Care',
          ' Independent Living',
          ' Point',
          ' Supported Living'
        ])}`
        type = 'other'
        spGrant = 'true'
        clientGroups = faker.random.arrayElements([
          'learning-disabilities',
          'mental-health',
          'young-at-risk'
        ])
        typeOfRegisteredHome = 'false'
        typeOfSupport = faker.helpers.randomize([
          'low',
          'medium'
        ])
        isAdapted = 'false'
        break
      case 5:
        // Physical health
        name = `${faker.address.city()}${faker.helpers.randomize([
          '',
          ' Care',
          ' House',
          ' Nursing Home',
          ' Point'
        ])}`
        type = 'other'
        spGrant = 'false'
        clientGroups = ['physical-disabilities']
        typeOfRegisteredHome = 'false'
        typeOfSupport = faker.helpers.randomize([
          'nursing',
          'low',
          'medium',
          'high'
        ])
        isAdapted = faker.datatype.boolean().toString()
        break
      case 6:
        // Other
        name = `${faker.address.city()}${faker.helpers.randomize([
          '',
          ' Center',
          ' Close',
          ' House'
        ])}`
        type = 'other'
        spGrant = faker.datatype.boolean().toString()
        clientGroups = faker.random.arrayElements([
          'offenders',
          'domestic-violence',
          'alcohol',
          'drugs',
          'hiv-aids',
          'refugees'
        ])
        typeOfRegisteredHome = 'false'
        typeOfSupport = faker.helpers.randomize([
          'low',
          'medium',
          'high'
        ])
        isAdapted = faker.datatype.boolean().toString()
    }

    // Scheme date
    const hasEndDate = faker.datatype.boolean()

    // Scheme
    schemes[id] = {
      id,
      organisationId: faker.helpers.randomize([
        'PARENT1'
      ]),
      name,
      'local-authority': faker.helpers.randomize(localAuthorities),
      'postcode-known': 'true',
      postcode: faker.address.zipCode(),
      confidential: faker.datatype.boolean().toString(),
      type,
      units: faker.datatype.number({ max: 20 }),
      'type-of-registered-home': typeOfRegisteredHome,
      'type-of-unit': faker.helpers.randomize([
        'bungalow',
        'flat',
        'house',
        'shared-bungalow',
        'shared-flat',
        'shared-house',
        'other'
      ]),
      'type-of-building': faker.helpers.randomize([
        'converted',
        'purpose-built'
      ]),
      'type-of-support': typeOfSupport,
      'is-adapted': isAdapted,
      'client-groups': clientGroups,
      'intended-stay': faker.helpers.randomize([
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
  }

  return schemes
}

generateDataset(generateSchemes(), 'schemes')
