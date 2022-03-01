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
  DC001: {
    name: 'Delia Cross',
    email: 'data.coordinator@kfhs-homes.org.uk',
    organisationId: 'LH3904',
    role: 'coordinator',
    lastActive: '2021-10-24T16:04:34',
    invitedById: 'ADMIN'
  },
  // Data provider at owning organisation
  DP001: {
    name: 'Daisy Perkins',
    email: 'data.provider@kfhs-homes.org.uk',
    organisationId: 'LH3904',
    role: 'provider',
    invitedById: 'DC001'
  },
  // Data provider at managing organisation
  DCM01: {
    name: 'Michael Smith',
    email: 'data.coordinator@managing.org.uk',
    organisationId: 'CHILD1',
    role: 'coordinator',
    lastActive: '2021-08-09T12:24:12',
    invitedById: 'DC001'
  },
  DPM01: {
    name: 'Sally Jones',
    email: 'data.provider@managing.org.uk',
    organisationId: 'CHILD1',
    role: 'provider',
    lastActive: '2021-09-02T13:04:18',
    invitedById: 'DCM01'
  },
  DPM02: {
    name: 'David Smith',
    email: 'david.smith@charity.org.uk',
    organisationId: 'CHILD2',
    role: 'provider',
    lastActive: '2021-10-01T11:04:18',
    invitedById: 'DC001'
  }
}
