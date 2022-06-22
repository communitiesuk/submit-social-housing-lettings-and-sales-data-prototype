import { faker } from '@faker-js/faker'
import { generateDataset } from '../app/utils.js'
import registeredProviders from '../app/datasets/registered-providers.js'

faker.locale = 'en_GB'

const generateOrganisations = () => {
  const organisations = {}

  Object.entries(registeredProviders).forEach(([key, value]) => {
    const isAgent = (value.designation !== 'Local authority').toString()
    const isOwner = (value.designation === 'Local authority' || value['corporate-form'] === 'Company').toString()

    // If organisation owns stock, give it some agents (aka children)
    const agents = (isOwner === 'true')
      ? faker.helpers.arrayElements(
        Object.keys(registeredProviders),
        3
      )
      : []

    // If organisation manages stock, give it some owners (aka parents)
    const owners = isAgent
      ? faker.helpers.arrayElements(
        Object.keys(registeredProviders),
        2
      )
      : []

    const domain = (name) => {
      name = name.replace(/[,.]/g, '')
      name = name.replace(/(?:\sLimited)|(?:\sSociety)|(?:\sCo-operative)/g, '')
      return name.replace(/\s/g, '-').toLowerCase() + '.org.uk'
    }

    organisations[key] = {
      id: key,
      name: value.name,
      domains: value.domains || [domain(value.name)],
      address: value.address
        ? value.address
        : {
            line1: faker.address.streetAddress(),
            line2: faker.address.cityName(),
            postalCode: faker.address.zipCode()
          },
      tel: value.tel
        ? value.tel
        : faker.phone.number(),
      type: value.designation === 'Local authority'
        ? 'Local authority'
        : 'Housing association',
      registration: value.registration || key,
      'rent-periods': value['rent-periods'] || faker.helpers.arrayElements([
        'fortnightly',
        'every-4-weeks',
        'monthly',
        'weekly-50',
        'weekly-49',
        'weekly-48',
        'weekly-47',
        'weekly-46',
        'weekly-52',
        'weekly-53'
      ]),
      isOwner: value.isOwner || isOwner,
      isOwnAgent: value.isOwnAgent || 'false',
      agents: value.agents || agents,
      isAgent: value.isAgent || isAgent,
      owners: value.owners || owners,
      acceptedDSA: 'true'
    }
  })

  return organisations
}

generateDataset(generateOrganisations(), 'organisations')
