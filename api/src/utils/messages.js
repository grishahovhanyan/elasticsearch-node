const VALIDATION_MESSAGES = {
  required: 'This field is required.',
  invalidBoolean: 'A valid boolean is required.',
  invalidNumber: 'A valid number is required.',
  invalidString: 'A valid string is required.',
  invalidArray: 'A valid array is required.',
  invalidISOFormat: 'A valid iso date format is required.',
  invalidChoice: (valueUsed, validValuesStr) => (`${valueUsed || 'This field'} is not a valid choice. Use one of these values instead: [${validValuesStr}].`),
  invalidDate: 'This field value must be greater then date now.',
  invalidFormat: (validFormatStr) => (`This field has wrong format. Use this format instead: ${validFormatStr}.`),
  invalidPasscode: 'Invalid passcode.'
}

const ERROR_MESSAGES = {
  unauthorized401: 'Authentication credentials were not provided.',
  forbidden403: 'You do not have permission to perform this action.',
  notFound404: 'Not found.'
}

const SUCCESS_RESPONSE = { message: 'success' }

module.exports = {
  VALIDATION_MESSAGES,
  ERROR_MESSAGES,
  SUCCESS_RESPONSE
}
