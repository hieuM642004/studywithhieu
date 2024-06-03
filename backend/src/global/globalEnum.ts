export enum HttpStatus {
  ERROR = 404,
  SUCCESS = 200 | 201,
  CONFLICT = 409, 
}

export enum HttpMessage {
  ERROR = 'Server Internal Error',
  SUCCESS = 'Server Response Success',
  CONFLICT = 'Conflict with existing data', 
}
