export default {
  // Administrator at DHLUC
  ADMIN: {
    name: 'Gary Meyler',
    email: 'admin@levellingup.gov.uk',
    organisationId: 'DLUHC',
    role: 'admin',
    lastActive: '2021-10-24T16:04:34'
  },
  // Data coordinator at owning organisation
  DCOO1: {
    name: 'Delia Cross',
    email: 'data.coordinator@owning.gov.uk',
    organisationId: 'PARENT1',
    role: 'coordinator',
    lastActive: '2021-10-24T16:04:34',
    invitedById: 'ADMIN'
  },
  // Data provider at owning organisation
  DPOO1: {
    name: 'Daisy Perkins',
    email: 'data.provider@owning.gov.uk',
    organisationId: 'PARENT1',
    role: 'provider',
    invitedById: 'DCOO1'
  },
  // Data provider at managing organisation
  DCMO1: {
    name: 'Michael Smith',
    email: 'data.coordinator@managing.org.uk',
    organisationId: 'CHILD1',
    role: 'coordinator',
    lastActive: '2021-08-09T12:24:12',
    invitedById: 'DCOO1'
  },
  DPMO1: {
    name: 'Sally Jones',
    email: 'data.provider@managing.org.uk',
    organisationId: 'CHILD1',
    role: 'provider',
    lastActive: '2021-09-02T13:04:18',
    invitedById: 'DCMO1'
  },
  DPMO2: {
    name: 'David Smith',
    email: 'david.smith@charity.org.uk',
    organisationId: 'CHILD2',
    role: 'provider',
    lastActive: '2021-10-01T11:04:18',
    invitedById: 'DCOO1'
  }
}
