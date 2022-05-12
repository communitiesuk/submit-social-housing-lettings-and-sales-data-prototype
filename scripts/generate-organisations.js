import { faker } from '@faker-js/faker'
import { generateDataset } from '../app/utils.js'
import localAuthorities from '../app/datasets/local-authorities.js'
import registeredProviders from '../app/datasets/registered-providers.js'

faker.locale = 'en_GB'

const generateOrganisations = () => {
  const organisations = {}

  Object.entries(registeredProviders).forEach(([key, value]) => {
    const stock = value.designation === 'Local authority' || value['corporate-form'] === 'Company'

    organisations[key] = {
      id: key,
      name: value.name,
      address: value.address
        ? value.address
        : [
            faker.address.streetAddress(),
            faker.address.cityName(),
            faker.address.zipCode()
          ].join(', '),
      tel: value.tel
        ? value.tel
        : faker.phone.phoneNumber(),
      type: value.designation === 'Local authority'
        ? 'Local authority'
        : 'Housing association',
      areas: value.areas
        ? value.areas
        : faker.helpers.arrayElements(localAuthorities.map(area => area.gss), 3),
      parents: value.parents
        ? value.parents
        : (value.designation !== 'Local authority')
            ? faker.helpers.arrayElements(
              Object.keys(registeredProviders),
              2
            )
            : false,
      children: value.children
        ? value.children
        : stock
          ? faker.helpers.arrayElements(
            Object.keys(registeredProviders),
            3
          )
          : false,
      stock: value.stock
        ? value.stock
        : stock,
      signedDSA: faker.date.past(3)
    }
  })

  return organisations
}

generateDataset(generateOrganisations(), 'organisations')
