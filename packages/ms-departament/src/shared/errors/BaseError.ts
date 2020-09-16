import ExtendableError from 'extendable-error';

export type IErrorDetails = {
  resource?: string;
  field?: string;
  property?: number;
  reason?: string;
  message?: string;
};

export interface IDomainError {
  message: string;
  code?: number;
  errors?: IErrorDetails | IErrorDetails[];
}

export type IError = {
  resource?: string;
  field?: string;
  reason?: string;
};

export interface DomainError {
  statusCode?: number;
  message?: string;
  documentation_url?: string;
  errors?: IError[] | IError;
}

const isString = (d: string) =>
  Object.prototype.toString.call(d) === '[object String]';
const isObject = (d: object) =>
  Object.prototype.toString.call(d) === '[object Object]';

export class AppError extends ExtendableError {
  public readonly message: string;
  public readonly code: number;
  public readonly errorsDetails?: IErrorDetails | IErrorDetails[];
  constructor(args: IDomainError) {
    super(args.message || '');
    const message = args.message || '';
    const code = args.code || 400;
    const errors = args.errors || undefined;

    this.message = message;
    this.code = code;
    this.errorsDetails = errors;
  }

  serialize() {
    const { message, code, errorsDetails } = this;
    let error: IDomainError = {
      message,
      code,
    };
    if (errorsDetails) {
      error.errors = errorsDetails;
    }
    return error;
  }
}
