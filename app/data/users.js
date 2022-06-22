export default {
  // DLUHC
  ADMIN: {
    name: 'Gary Meyler',
    email: 'admin@levellingup.gov.uk',
    organisationId: 'SUPPORT',
    role: 'admin',
    lastActive: '2021-10-24T16:04:34',
    dpo: 'true',
    'key-contact': 'true'
  },
  // Organisation that owns stock and contracts management to agents
  'DC-OWNER': {
    name: 'Delia Cross',
    email: 'data.coordinator@malinsgroup.co.uk',
    organisationId: 'OWNER',
    role: 'coordinator',
    lastActive: '2021-10-24T16:04:34',
    invitedById: 'ADMIN',
    dpo: 'true',
    'key-contact': 'true'
  },
  'DP-OWNER': {
    name: 'Daisy Perkins',
    email: 'data.provider@malinsgroup.co.uk',
    organisationId: 'OWNER',
    role: 'provider',
    invitedById: 'DC-OWNER',
    dpo: 'false',
    'key-contact': 'false'
  },
  // Organisation that owns and manages stock
  'DC-OWNER_MANAGER': {
    name: 'Judith Summer',
    email: 'data.coordinator@believehousing.co.uk',
    organisationId: 'OWNER_MANAGER',
    role: 'coordinator',
    invitedById: 'ADMIN',
    dpo: 'true',
    'key-contact': 'true'
  },
  'DP-OWNER_MANAGER': {
    name: 'Brendan Phillips',
    email: 'data.provider@believehousing.co.uk',
    organisationId: 'OWNER_MANAGER',
    role: 'provider',
    invitedById: 'DC-OWNER_MANAGER',
    dpo: 'false',
    'key-contact': 'false'
  },
  // Organisation that owns and manages stock and that of other organisations
  'DC-OWNER_AGENT': {
    name: 'David Smith',
    email: 'data.coordinator@placesforpeople.co.uk',
    organisationId: 'OWNER_AGENT',
    role: 'coordinator',
    lastActive: '2021-10-01T11:04:18',
    invitedById: 'DC-OWNER',
    dpo: 'true',
    'key-contact': 'true'
  },
  'DP-OWNER_AGENT': {
    name: 'David Smith',
    email: 'data.provider@placesforpeople.co.uk',
    organisationId: 'OWNER_AGENT',
    role: 'provider',
    lastActive: '2021-10-01T11:04:18',
    invitedById: 'DC-OWNER',
    dpo: 'false',
    'key-contact': 'false'
  },
  // Organisation manages properties for other organisations
  'DC-AGENT': {
    name: 'Michael Smith',
    email: 'data.coordinator@bcwa.org.uk',
    organisationId: 'AGENT',
    role: 'coordinator',
    lastActive: '2021-08-09T12:24:12',
    invitedById: 'DC-OWNER',
    dpo: 'true',
    'key-contact': 'false'
  },
  'DP-AGENT': {
    name: 'Sally Jones',
    email: 'data.provider@bcwa.org.uk',
    organisationId: 'AGENT',
    role: 'provider',
    lastActive: '2021-09-02T13:04:18',
    invitedById: 'DC-AGENT',
    dpo: 'false',
    'key-contact': 'false'
  }
}
