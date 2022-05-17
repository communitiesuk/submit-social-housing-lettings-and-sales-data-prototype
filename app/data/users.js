export default {
  // Customer support agent at DLUHC
  ADMIN: {
    name: 'Gary Meyler',
    email: 'admin@levellingup.gov.uk',
    organisationId: 'DLUHC',
    role: 'admin',
    lastActive: '2021-10-24T16:04:34',
    dpo: 'true',
    'key-contact': 'true'
  },
  // Data coordinator at owning organisation
  DC001: {
    name: 'Delia Cross',
    email: 'data.coordinator@owning.org.uk',
    organisationId: 'PARENT1',
    role: 'coordinator',
    lastActive: '2021-10-24T16:04:34',
    invitedById: 'ADMIN',
    dpo: 'true',
    'key-contact': 'true'
  },
  // Data provider at owning organisation
  DP001: {
    name: 'Daisy Perkins',
    email: 'data.provider@owning.org.uk',
    organisationId: 'PARENT1',
    role: 'provider',
    invitedById: 'DC001',
    dpo: 'false',
    'key-contact': 'false'
  },
  // Data provider at managing organisation
  DCM01: {
    name: 'Michael Smith',
    email: 'data.coordinator@managing.org.uk',
    organisationId: 'CHILD1',
    role: 'coordinator',
    lastActive: '2021-08-09T12:24:12',
    invitedById: 'DC001',
    dpo: 'true',
    'key-contact': 'false'
  },
  DPM01: {
    name: 'Sally Jones',
    email: 'data.provider@managing.org.uk',
    organisationId: 'CHILD1',
    role: 'provider',
    lastActive: '2021-09-02T13:04:18',
    invitedById: 'DCM01',
    dpo: 'false',
    'key-contact': 'false'
  },
  DPM02: {
    name: 'David Smith',
    email: 'david.smith@charity.org.uk',
    organisationId: 'CHILD2',
    role: 'provider',
    lastActive: '2021-10-01T11:04:18',
    invitedById: 'DC001',
    dpo: 'false',
    'key-contact': 'false'
  }
}
