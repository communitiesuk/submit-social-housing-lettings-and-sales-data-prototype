export default {
  white: [{
    text: 'English, Welsh, Scottish, Northern Irish or British',
    value: 'white-british'
  }, {
    text: 'Irish',
    value: 'white-irish'
  }, {
    text: 'Gypsy or Irish Traveller',
    value: 'white-gypsy'
  }, {
    text: 'Any other White background',
    value: 'white-other',
    conditional: {
      html: '<p>How would you describe your background (optional)?</p>'
    }
  }],
  mixed: [{
    text: 'White and Black Caribbean',
    value: 'mixed-white-black-caribbean'
  }, {
    text: 'White and Black African',
    value: 'mixed-white-black-african'
  }, {
    text: 'White and Asian',
    value: 'mixed-white-asian'
  }, {
    text: 'Any other Mixed or Multiple ethnic background',
    value: 'mixed-other',
    conditional: {
      html: '<p>How would you describe your background (optional)?</p>'
    }
  }],
  asian: [{
    text: 'Indian',
    value: 'asian-indian'
  }, {
    text: 'Pakistani',
    value: 'asian-pakistani'
  }, {
    text: 'Bangladeshi',
    value: 'asian-bangladeshi'
  }, {
    text: 'Chinese',
    value: 'asian-chinese'
  }, {
    text: 'Any other Asian background',
    value: 'asian-other',
    conditional: {
      html: '<p>How would you describe your background (optional)?</p>'
    }
  }],
  black: [{
    text: 'African',
    value: 'black-african'
  }, {
    text: 'Caribbean',
    value: 'black-caribbean'
  }, {
    text: 'Any other Black, African or Caribbean background',
    value: 'black-other',
    conditional: {
      html: '<p>How would you describe your background (optional)?</p>'
    }
  }],
  other: [{
    text: 'Arab',
    value: 'other-arab'
  }, {
    text: 'Any other ethnic group',
    value: 'black-other',
    conditional: {
      html: '<p>How would you describe your background (optional)?</p>'
    }
  }]
}
