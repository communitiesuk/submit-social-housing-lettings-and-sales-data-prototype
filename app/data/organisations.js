export default {
  DLUHC: {
    name: 'Department for Levelling Up, Housing & Communities',
    address: '2 Marsham Street, London. SW1P 4DF',
    tel: '0303 444 1209',
    type: 'Not applicable',
    areas: [],
    stock: false
  },
  PARENT1: {
    name: 'Example District Council',
    address: 'County Hall, Exemplar. EX1 1NG',
    tel: '01234 567890',
    type: 'Local authority',
    areas: ['E07000220'],
    parents: [],
    children: ['CHILD1', 'CHILD2'],
    stock: true
  },
  CHILD1: {
    name: 'Housing Management Limited',
    address: '34 High Street, Exemplar. EX2 2AG',
    tel: '01432 098765',
    type: 'Housing association',
    areas: ['E07000220', 'E07000218', 'E07000221'],
    parents: ['PARENT1'],
    stock: false
  },
  CHILD2: {
    name: 'Homes Charity CIC',
    address: '123a Sandsford Road, Exemplar. EX32 5HC',
    tel: '01432 980111',
    type: 'Housing association',
    areas: ['E07000218', 'E07000221'],
    parents: ['PARENT1'],
    stock: false
  }
}
