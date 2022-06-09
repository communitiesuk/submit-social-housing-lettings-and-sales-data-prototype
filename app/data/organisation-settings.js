import appData from '../data.js'

const data = await appData()

export function organisationSettings (organisation) {
  if (!organisation['rent-periods']) {
    return false
  }

  const rentPeriods = data.rentPeriods.filter(period =>
    organisation['rent-periods'].includes(period.value))

  return {
    rentPeriods
  }
}
