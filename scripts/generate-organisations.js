import { faker } from '@faker-js/faker'
import { generateDataset } from '../app/utils.js'
import localAuthorities from '../app/datasets/local-authorities.js'
import registeredProviders from '../app/datasets/registered-providers.js'

faker.locale = 'en_GB'

const generateOrganisations = () => {
  let organisations = {}

  Object.entries(registeredProviders).forEach(([key, value]) => {
    const stock = value.designation === 'Local authority' || value['corporate-form'] === 'Company'

    organisations[key] = {
      id: key,
      name: value.name,
      address: [
        faker.address.streetAddress(),
        faker.address.cityName(),
        faker.address.zipCode()
      ].join(', '),
      tel: faker.phone.phoneNumber(),
      type: value.designation === 'Local authority'
        ? 'Local authority'
        : 'Housing association',
      areas: faker.random.arrayElements(
        localAuthorities.map(area => area.gss),
        3
      ),
      parents: (value.designation !== 'Local authority')
        ? faker.random.arrayElements(
            Object.keys(registeredProviders),
            2
          )
        : false,
      children: stock
        ? faker.random.arrayElements(
            Object.keys(registeredProviders),
            3
          )
        : false,
      stock
    }
  })

  organisations.DLUHC = {
    id: 'DLUHC',
    name: 'Department for Levelling Up, Housing & Communities',
    address: '2 Marsham Street, London. SW1P 4DF',
    tel: '0303 444 1209',
    type: 'Not applicable',
    areas: [],
    stock: false
  }

  organisations.PARENT1 = {
    id: 'PARENT1',
    name: 'Example District Council',
    address: 'County Hall, Exemplar. EX1 1NG',
    tel: '01234 567890',
    type: 'Local authority',
    areas: ['E07000220'],
    parents: [],
    children: ['CHILD1', 'CHILD2'],
    stock: true
  }

  organisations.CHILD1 = {
    id: 'CHILD1',
    name: 'Housing Management Limited',
    address: '34 High Street, Exemplar. EX2 2AG',
    tel: '01432 098765',
    type: 'Housing association',
    areas: ['E07000220', 'E07000218', 'E07000221'],
    parents: ['PARENT1'],
    stock: false
  }

  organisations.CHILD2 = {
    id: 'CHILD2',
    name: 'Homes Charity CIC',
    address: '123a Sandsford Road, Exemplar. EX32 5HC',
    tel: '01432 980111',
    type: 'Housing association',
    areas: ['E07000218', 'E07000221'],
    parents: ['PARENT1'],
    stock: false
  }

  return organisations
}

generateDataset(generateOrganisations(), 'organisations')
