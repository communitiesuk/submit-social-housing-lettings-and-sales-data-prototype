import localAuthorities from '../../datasets/local-authorities.js'

const localAuthoritiesInEngland = localAuthorities
  .filter(la => la.gss.startsWith('E'))
  .sort((a, b) => {
    const fa = a.name.toLowerCase()
    const fb = b.name.toLowerCase()

    if (fa < fb) { return -1 }
    if (fa > fb) { return 1 }
    return 0
  })
  .map(la => ({ text: la.name, value: la.gss }))

localAuthoritiesInEngland.unshift({
  value: null,
  text: 'Select…'
})

export default localAuthoritiesInEngland
