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
      'about-this-log': {
        gdpr: [
          check(getFieldName('gdpr'))
            .not()
            .isEmpty()
            .withMessage('Select whether the tenant or buyer has seen the notice')
        ],
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
        'sale-or-letting': [
          check(getFieldName('sale-or-letting'))
            .not()
            .isEmpty()
            .withMessage('Tell us if it’s a sale or letting')
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
          check(getFieldName('letting-rent-type'))
            .not()
            .isEmpty()
            .withMessage('Select the rent type'),
          check(getFieldName('letting-need-type'))
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
    }
  }
}
