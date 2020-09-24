import AppError, { IErrorDetails } from './AppError';

export class CONFLICT_ERRORS {
  static readonly serialNumberAlreadyExists = function (serialNumber: string) {
    return new CONFLICT_ERRORS(
      'alreadyExists',
      `The Product with serial number: ${serialNumber} already exists. Please select a different serial number and try again..`,
    );
  };
  static readonly locationAlreadyExists = function (
    streetAddress: string,
    postalCode: string,
  ) {
    return new CONFLICT_ERRORS(
      'alreadyExists',
      `The Localization with postal code ${postalCode} and street addres ${streetAddress} already exists. Please select a different address or postal code and try again..`,
    );
  };
  static readonly equipamentAlreadyExists = function (codReference: string) {
    return new CONFLICT_ERRORS(
      'alreadyExists',
      `The Equipament with codPatrimonio: ${codReference} already exists. Please select a different codPatrimonio and try again..`,
    );
  };
  static readonly CategoryAlreadyExists = function (categoryName: string) {
    return new CONFLICT_ERRORS(
      'alreadyExists',
      `The Category with name ${categoryName} already exists. Please select a different Category Name and try again..`,
    );
  };
  static readonly loginAlreadyExists = function (login: string) {
    return new CONFLICT_ERRORS(
      'alreadyExists',
      `The user with login ${login} already exists. Please select a different login and try again..`,
    );
  };
  static readonly employeeAlreadyExists = function (matricula: string) {
    return new CONFLICT_ERRORS(
      'alreadyExists',
      `The employee with matricula ${matricula} already exists. Please select a different matricula and try again..`,
    );
  };
  static readonly departamentAlreadyExists = function (dep_name: string) {
    return new CONFLICT_ERRORS(
      'alreadyExists',
      `The departament ${dep_name} is not available. Please select a different name and try again..`,
    );
  };
  static readonly invalidArgument = new CONFLICT_ERRORS(
    'invalidArgument',
    'The value for one of fields in the request body was invalid.',
  );

  private constructor(readonly key: string, readonly value: any) {}

  toString() {
    return this.key;
  }
}

export class CONFLICT extends AppError {
  public constructor(
    type: CONFLICT_ERRORS,
    erros?: IErrorDetails[] | IErrorDetails,
  ) {
    super({ code: 400, message: type.value, errors: erros });
  }
}
