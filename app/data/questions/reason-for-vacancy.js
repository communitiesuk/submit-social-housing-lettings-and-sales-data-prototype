export default {
  relet: [{
    text: 'Renewal of fixed-term tenancy',
    value: 'renewal-fixed-term'
  }, {
    text: 'Internal transfer',
    value: 'internal-transfer',
    hint: {
      text: 'Excluding renewals of a fixed-term tenancy.'
    }
  }, {
    text: 'Re-let to tenant who occupied same property as temporary accommodation',
    value: 'convert-from-temporary'
  }, {
    text: 'Tenant involved in a succession downsize',
    value: 'downsize'
  }, {
    text: 'Tenant moved to private sector or other accommodation',
    value: 'moved-private-sector'
  }, {
    text: 'Tenant moved to other social housing provider',
    value: 'other-provider'
  }, {
    text: 'Tenant moved to care home',
    value: 'care-home'
  }, {
    text: 'Tenant abandoned property',
    value: 'abandoned'
  }, {
    text: 'Tenant was evicted due to rent arrears',
    value: 'arrears'
  }, {
    text: 'Tenant was evicted due to anti-social behaviour',
    value: 'anti-social'
  }, {
    text: 'Previous tenant died with no succession',
    value: 'died'
  }],
  'non-relet': [{
    text: 'First let of new build property',
    value: 'newprop'
  }, {
    text: 'First let of conversion, rehabilitation or acquired property',
    value: 'conversion'
  }, {
    text: 'First let of leased property',
    value: 'leased'
  }]
}
