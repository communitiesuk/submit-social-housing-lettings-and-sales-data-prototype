import _ from 'lodash'
import validator from 'express-validator'
const { check } = validator

export const validations = (req) => {
  const { logId, sectionId } = req.params

  /**
   * Get field name to validate
   *
   * @param {String} fieldName Name of question field
   * @returns {String} Full data path of field using dot notation
   *
   * @example getFieldName('full-name') => account.full-name
   */
  const getFieldName = (fieldName) => {
    const sectionKey = `logs[${logId}][${sectionId}]`
    const fieldKey = `${sectionKey}[${fieldName}]`
    const fieldKeyPath = _.toPath(fieldKey).join('.')
    return fieldKeyPath
  }

  /** Validation checks, organised by type, section, and view
   *
   * Uses validators from validator.js
   * @see https://github.com/validatorjs/validator.js
   */
  return {
    logs: {
      setup: {
        organisation: [
          check(getFieldName('organisation-owner'))
            .not()
            .contains('Select…')
            .withMessage('Select the organisation that owns this property'),
          check(getFieldName('organisation-manager'))
            .not()
            .contains('Select…')
            .withMessage('Select the organisation that manages this property')
        ],
        'letting-renewal': [
          check(getFieldName('letting-renewal'))
            .not()
            .isEmpty()
            .withMessage('Select yes if this is a renewal to the same tenant in the same property')
        ],
        // 'letting-start-date': [
        //   check(getFieldName('letting-start-date.year'))
        //     .not()
        //     .isEmpty()
        //     .withMessage('Enter the tenancy start date')
        // ],
        'letting-type': [
          check(getFieldName('type-of-rent'))
            .not()
            .isEmpty()
            .withMessage('Select the rent type'),
          check(getFieldName('type-of-need'))
            .not()
            .isEmpty()
            .withMessage('Select the needs type')
        ],
        'tenant-code': [
          check(getFieldName('tenant-code'))
            .not()
            .isEmpty()
            .withMessage('Enter the tenant code')
        ],
        // 'sale-completion-date': [
        //   check(getFieldName('sale-completion-date.year'))
        //     .not()
        //     .isEmpty()
        //     .withMessage('Enter the sale completion date')
        // ],
        'purchaser-code': [
          check(getFieldName('purchaser-code'))
            .not()
            .isEmpty()
            .withMessage('Enter the purchaser code')
        ]
      }
    },
    'household-characteristics': {
      'number-in-household': [
        check(getFieldName('number-in-household'))
          .not()
          .isEmpty()
          .withMessage('Enter the number of people who live in the household'),
        check(getFieldName('number-in-household'))
          .isInt({ min: 1, max: 8 })
          .withMessage('You must enter a number between 1 and 8')
      ]
    }
  }
}
